# UI Craft — UI Design Assistant MCP

> A psychology-backed UI design assistant that plugs into your coding agent (GitHub Copilot, Claude) inside VS Code. Stop designing from scratch — get structured layout, typography, color, and cognitive science guidance for any page type in seconds.

---

## What Is This?

**UI Craft** is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server. When connected to your VS Code agent, it gives your AI coding assistant deep UI design knowledge — grounded in cognitive psychology, UX research, and real design principles.

Instead of asking your agent "make it look good," you ask:
> "Design a landing page for a B2B SaaS product focused on trust"

And your agent calls UI Craft, which returns a structured design strategy: layout, typography, color system, psychological principles to apply, and common mistakes to avoid.

---

## Features (V1)

- **`design_page` tool** — Generate a complete UI strategy for any page type
  - Page types: `dashboard`, `landing_page`, `form`, `settings`, `onboarding`, `pricing`, `navigation`
  - Emphases: `clarity`, `conversion`, `trust`, `speed`
  - Returns: layout recommendation, typography rules, color strategy, top 3 psychology principles, checklist
- **16 psychology principles** baked in — Gestalt, Fitts's Law, Hick's Law, Cognitive Load, Halo Effect, Anchoring Bias, and more
- Works with any MCP-compatible agent: GitHub Copilot, Claude, Cursor

---

## Install & Setup (30 seconds)

**Prerequisites:** Node.js v18+ installed (`node --version` to check)

### Step 1 — Add to VS Code

Create `.vscode/mcp.json` in your project folder:

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

Or via command palette:
1. `Ctrl+Shift+P` → **"MCP: Add Server"**
2. Type: command = `npx`, args = `-y @chinmoy_mitra/ui-craft@latest`
3. Name it `ui-craft`

### Step 2 — Restart VS Code

The server starts automatically. Check `Ctrl+Shift+P` → **"MCP: List Servers"** — you should see `ui-craft` running.

---

## How to Use

Switch your Copilot/Claude chat to **Agent mode**, then ask naturally:

```
Design a dashboard for developers focused on clarity

I need a landing page for enterprise buyers — what's the UI strategy?

What layout and color system should I use for an onboarding flow?
```

Your agent will call the `design_page` tool and return a structured design brief.

### Example Output

```
# UI Design Strategy: landing_page for enterprise buyers
Emphasis: trust | Page type: landing_page

## Layout Recommendation
Hero with H1 + single sentence value prop + one CTA. Social proof immediately
below. Feature section with 3-column grid. Pricing. FAQ. Footer CTA.

## Typography
Serif or semi-serif for high credibility. Generous line-height...

## Color Strategy
Blue primary (signals reliability). Deep navy or charcoal text...

## Psychology Principles to Apply
### The Halo Effect
A single positive trait (visual beauty) biases perception of trustworthiness...

### F-Pattern & Reading Patterns
Place the most important content in the top-left quadrant...
```

---

## Repo Structure

```
UI_Assitant_AI/
├── ui-mcp-server/          ← npm package (this is what gets published)
│   └── src/
│       ├── server.ts       ← MCP entry point
│       ├── tools/          ← tool logic
│       └── content/        ← UI knowledge base (JSON)
├── ui-psychology-lab/      ← interactive React web app (educational)
└── .github/workflows/      ← CI/CD auto-publish
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a full guide on adding features.

---

## Roadmap

- [ ] `choose_palette` — suggest color systems based on brand mood
- [ ] `improve_ui` — critique existing JSX/HTML and suggest improvements  
- [ ] `generate_component_prompt` — generate Tailwind/React component prompts
- [ ] `accessibility_check` — usability and contrast recommendations
- [ ] Remote content updates (no reinstall needed for knowledge base changes)

---

## For Developers

See [ARCHITECTURE.md](./ARCHITECTURE.md) for how to add tools, expand the knowledge base, and publish new versions.

---

## License

APACHE
