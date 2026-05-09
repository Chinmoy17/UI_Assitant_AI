# Development Journal

Running log of what actually shipped, when, and why. Newest entries at the top.
For forward planning see phase_plan.md. For architecture decisions see ARCHITECTURE.md.

---

## 2026-05-09 (session 2)

**Branch:** `orch`

### Orchestrator — Phase 2 complete

**Performance optimizations shipped:**
- Singleton module-level caches for all three KB loaders (`loadKBVisualPrinciples`, `loadKBBrandExamples`, `loadKBTypographySpec`). Disk reads happen once per server lifetime; subsequent calls return the cached value in <1ms.
- `loadAllPrinciples()` is also cached. Combined: KB access goes from O(n × file reads) to O(1) after first call.
- `buildInvertedIndexes()` — built once from `loadAllPrinciples()`. Two maps: `_pageTypeIndex` (page_type → Set\<principleId\>) and `_emphasisIndex` (emphasis → Set\<principleId\>).
- `buildTermSet(...values)` — splits all input strings on whitespace/punctuation into a flat `Set<string>` for O(1) `.has()` lookups.
- `hasAnyTermFast(termSet, terms)` — replaces `hasAnyTerm(combined, terms)` string scans everywhere: `rankPrinciples`, `buildHighImpactChanges`, and `designPage()` adaptation layer.

**Orchestrator (`src/tools/orchestrator.ts`):**
- New `run_session` MCP tool — all fields optional; acts as single entry point for the full INIT → PLAN → DESIGN → EVALUATE → DONE state machine.
- Smart input resolution: explicit args → stored `context.json` → keyword inference from freeform `context` string → safe defaults. No arg is truly required.
- Context inference: `inferPageType()` and `inferAudienceText()` extract signals from natural-language context strings using regex patterns.
- Fresh-start detection: if no args AND `context.json` is blank (new project) → returns structured "needs info" response with exactly the two questions that can't be inferred (page_type + audience). No crashing, no silent failure.
- `withRetry<T>()` — synchronous retry wrapper with 50/100/200ms exponential backoff, max 3 attempts per stage. Each stage emits a structured `StageResult` regardless of success/failure.
- Stage fallbacks: PLAN failure → "proceeding with defaults" note; DESIGN failure → minimal inline guidance (hierarchy, WCAG, font size); EVALUATE always succeeds and shows a stage scorecard.
- Outer catch for INIT failures (disk permissions, path issues) — returns actionable error with env var fix instructions.

**Global MCP storage fix (`src/storage/storage.ts`):**
- `findGitRoot()` — walks up from cwd looking for `.git` directory. Stops at filesystem root.
- `resolveWorkspaceRoot()` extended: `UI_CRAFT_STORAGE_DIR` → `UI_CRAFT_WORKSPACE_DIR` → git root → non-install cwd → `~/.ui-craft/global/` fallback.
- `isLikelyInstallPath()` now also catches `_npx`, `appdata\roaming\npm`, `.npm/_npx` patterns.
- Added `import * as os from 'os'` for `os.homedir()` fallback.
- Context is now project-scoped even for users who set the MCP globally in VS Code settings.

**Ethical usage analytics:**
- `usage.json` — local-only, anonymous. Tracks: `install_id` (random UUID, stable per install location, NOT a user identifier), `version`, `first_seen`, `last_seen`, `total_sessions`, `page_types` counts, `tool_calls` counts.
- `appendUsageEvent()` in `storage.ts` — non-throwing, always-silent, called from every tool handler.
- `src/telemetry/telemetry.ts` — opt-in remote telemetry. Off by default. User sets `UI_CRAFT_TELEMETRY_URL=https://...` in mcp.json env block. Validates HTTPS, 3s timeout, fire-and-forget. Payload: version, install_id, page_type, emphasis, is_fresh_start, stage_count, success. Zero PII.
- `get_usage_stats` MCP tool — shows local stats + telemetry status + public npm download stats URL.

**Server startup:**
- `initContextSystem()` called at server start in `main()` before transport connect. `.vscode/ui-assistant/` is guaranteed to exist before any tool runs.

---

## 2026-05-09 (session 1)

**Branch:** `orch`

- Diagnosed performance risk: KB loaders call fs.readFileSync on every tool invocation. Documented singleton cache pattern and inverted index strategy as Phase 2 prerequisites.
- Identified AI-generated claim problem (portfolio scenario): agent was using MCP output as confidence fuel to invent specifics. Scoped `suggest_content` tool with consent gate as Phase 3 work item.
- Added checklists to phase_plan.md for Phases 0–4. Phase 1 marked DONE, Phase 2 marked NEXT.
- Created this journal

---

## 2026-05-08

**Branch:** `main`

- Switched .vscode/mcp.json from local dist path back to `npx @chinmoy_mitra/ui-craft@latest` for production use.
- Fixed .gitignore: changed `.vscode/ui-assistant/` to `**/.vscode/ui-assistant/` to catch the pattern at any depth.
- Added `deployment.txt` (gitignored) with inspector command, publish sequence, versioning rules, pre-publish checklist, and files to keep in sync.
- Created `CONTRIBUTING.md` for collaborators — full clone, setup, branch, and submit workflow.
- Exposed PAT in terminal via `git remote get-url origin`. Token revoked. Remote URL cleaned.
- Diagnosed MCP Inspector "Command not found": must run from inside `ui-mcp-server/`, not repo root.

---

## 2026-05-07

**Branch:** `main`
**Release:** v0.3.0 (pending push)

**KB ingestion complete:**
- Created `src/content/kb/visual_principles.json` — 12 visual design principles (balance, contrast, emphasis/hierarchy, placement/proximity, alignment, movement/rhythm, white space, proportion/scale, pattern/repetition, unity, variety, design ethics)
- Created `src/content/kb/brand_examples.json` — 6 brand emotional profiles: Nike, Apple, Meta, Spotify, Airbnb, Stripe with industry_match, emphasis_match, design signals, type/color direction
- Created `src/content/kb/typography_spec.json` — font families by use case, size scale, line-height scale, spacing tokens, button targets, per-page-type pairings
- Updated `design_page.ts` with 3 new output sections: Font Recommendations, Visual Design Foundation, Emotional Direction
- Replaced 5-item checklist with full KB section 9 review checklist (attention, readability, structure, interaction, brand/emotion, ethics/accessibility)
- Build confirmed clean, all 3 KB files present in dist/content/kb/

**Build regression fix (earlier same day):**
- Root cause: `server.tool()` MCP SDK generic inference on 4 registered tools → 27.8M type instantiations, 6GB memory, ~197s compile
- Fix: `registerTool()` non-generic wrapper using `server.tool.bind(server) as unknown as (...)` bypasses deep inference
- Result: ~1.3s total build, 163MB memory

**Storage and onboarding (earlier same day):**
- storage.ts expanded with PageModel schema, explicit update interfaces (ProjectContextUpdate, StorageStateUpdate), WorkingMode / ChangeBehavior / DensityPreference types
- start_session MCQ tool built and registered — writes to both context.json and state.json, returns Markdown session summary
- Context split confirmed: context.json = durable project memory, state.json = live page/session state

**UI Psychology Lab context set via MCP:**
- Industry: education, stack: React + TypeScript + Tailwind + Vite, theme: dark, accent: #6366f1, device: desktop
- Custom rules written covering educational SPA constraints

---

## Earlier sessions (pre-journal)

**v0.2.0 shipped:**
- design_page tool with scoring/ranking logic
- get_project_context / set_project_context tools
- Layout, typography, color advice tables per page_type × emphasis
- Industry, audience, device adaptation layers
- High-impact change generator (existing vs greenfield surface)

**v0.1.x shipped:**
- Initial MCP server with basic design_page tool
- 16 psychology principles across 5 categories
- Published to npm as @chinmoy_mitra/ui-craft
- GitHub Actions CI/CD configured (push to main → npm publish)
