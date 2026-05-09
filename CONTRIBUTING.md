# Contributing Guide

This repo has two parts that work together:

| Folder | What it is |
|---|---|
| `ui-mcp-server/` | MCP server — the AI design brain. Published to npm as `@chinmoy_mitra/ui-craft` |
| `ui-psychology-lab/` | React app — interactive UI psychology teaching tool |

Both can be worked on independently. You don't need to touch the MCP server to work on the lab, and vice versa.

---

## Prerequisites

Install these before anything else:

- **Node.js 20+** — https://nodejs.org (use the LTS version)
- **Git** — https://git-scm.com
- **VS Code** — https://code.visualstudio.com

Verify:
```bash
node -v    # should show v20.x or higher
npm -v     # should show 10.x or higher
git --version
```

---

## Step 1 — Clone the repo

You need to accept the GitHub collaborator invite first. Check your email or go to:
`https://github.com/Chinmoy17/UI_Assitant_AI/invitations`

Then clone:
```bash
git clone https://github.com/Chinmoy17/UI_Assitant_AI.git
cd UI_Assitant_AI
```

On first `git push` VS Code or Git will open a browser login — sign in with your GitHub account. No PAT needed if using the browser OAuth flow.

---

## Step 2 — Always create a branch before touching anything

**Never commit directly to `main`.** Pushing to main triggers the CI/CD pipeline which publishes to npm.

```bash
git checkout -b your-name/what-you-are-doing
# example: git checkout -b rayhan/sidebar-improvements
```

---

## Step 3 — Set up the UI Psychology Lab (React app)

```bash
cd ui-psychology-lab
npm install
npm run dev
```

Opens at `http://localhost:5173`

Hot reload is on — save a file and the browser updates instantly.

### Lab structure

```
ui-psychology-lab/src/
  App.tsx                   ← root, maps section IDs to components
  index.css                 ← global styles and design tokens
  data/
    navigation.ts           ← sidebar labels and IDs — add new sections here
  components/
    layout/
      Layout.tsx            ← outer shell: sidebar + main content area
      Sidebar.tsx           ← left navigation panel
    sections/               ← one file per psychology principle
      Introduction.tsx
      PreattentiveVision.tsx
      GestaltPrinciples.tsx
      CognitiveLoad.tsx
      ... (16 sections total)
    shared/
      Callout.tsx           ← purple left-border info box
      DemoBox.tsx           ← grey demo container
      StatBadge.tsx         ← monospace inline chip
```

### How to add a new section

1. Create `src/components/sections/YourSection.tsx`
2. Export a default function component
3. Add the export to `src/components/sections/index.ts`
4. Add an entry to `src/data/navigation.ts`
5. Add the section to the `SECTIONS` map in `App.tsx`

### Design conventions

- Dark theme is fixed — background `#0b0d10`, surface `#14171c`, border `#2a2f37`
- Accent color: `#6366f1` (indigo)
- Use `Callout` for key insights, `DemoBox` for interactive demos
- Body text: 15–17px, line-height 1.6, max-width 70ch for readability
- All inline styles for now — no Tailwind utility classes on section components

---

## Step 4 — Set up the MCP server (only if working on the design AI)

```bash
cd ui-mcp-server
npm install
npm run build
```

### MCP server structure

```
ui-mcp-server/src/
  server.ts                 ← entry point, registers all tools
  tools/
    design_page.ts          ← core design strategy generator
    start_session.ts        ← MCQ onboarding tool
  storage/
    storage.ts              ← reads/writes context.json and state.json
  content/
    cognitive/principles.json
    visual/principles.json
    interaction/principles.json
    persuasion/principles.json
    aesthetics/principles.json
    kb/
      visual_principles.json    ← 12 visual design principles from KB
      brand_examples.json       ← 6 brand emotional profiles
      typography_spec.json      ← font families, size scale, spacing tokens
```

### After any change to the MCP server

```bash
cd ui-mcp-server
npm run build
```

Then restart VS Code (or reload the MCP server in Copilot) to pick up the new build.

### Test MCP tools with the Inspector

```bash
cd ui-mcp-server
npx -y @modelcontextprotocol/inspector node dist/server.js
```

Opens at `http://localhost:6274` — lets you call any tool directly with a browser UI.

If you see "PORT IS IN USE":
```bash
netstat -ano | findstr :6274
taskkill /PID <the-pid-from-above> /F
```

### Connect VS Code Copilot to the local MCP build

The file `.vscode/mcp.json` controls which MCP server Copilot agent mode uses.

To use your **local build** (for development):
```json
{
  "servers": {
    "ui-craft": {
      "type": "stdio",
      "command": "node",
      "args": ["c:/path/to/your/clone/ui-mcp-server/dist/server.js"]
    }
  }
}
```

To use the **published npm package** (for production):
```json
{
  "servers": {
    "ui-craft": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@chinmoy_mitra/ui-craft@latest"]
    }
  }
}
```

---

## Step 5 — Submit your work

```bash
# Stage your changes
git add .

# Commit with a clear message
git commit -m "feat: describe what you did"

# Push your branch
git push origin your-name/what-you-are-doing
```

Then open a Pull Request on GitHub → Chinmoy reviews and merges → CI publishes automatically if MCP server changed.

### Commit message conventions

| Prefix | Use for |
|---|---|
| `feat:` | new feature or section |
| `fix:` | bug fix |
| `content:` | KB or copy update |
| `chore:` | dependency update, config change |

---

## Common issues

**`npm install` fails with permission error on Windows**
Run the terminal as Administrator, or change the install location:
```bash
npm config set prefix ~/.npm-global
```

**Lab shows blank page**
Check the browser console. Usually a missing import in `index.ts` after adding a new section.

**MCP Inspector says "Command not found"**
You're running the inspector from the wrong folder. Must be run from inside `ui-mcp-server/`, not the repo root.

**Copilot agent can't find the MCP server**
After changing `mcp.json`, restart VS Code completely (not just reload window).

---

## What not to touch

- `.github/workflows/publish.yml` — CI/CD config, leave as-is
- `ui-mcp-server/dist/` — auto-generated, never edit manually
- `.vscode/ui-assistant/` — local runtime state files, gitignored
- `deployment.txt` — internal ops reference, gitignored
