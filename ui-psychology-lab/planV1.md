# UI MCP Assistant — Implementation Plan (Local-first, NPM-distributed)

## 🎯 Goal
Build a **UI Design Assistant MCP server** that integrates into VS Code (Copilot / coding agents), so you never design UI from scratch again.

Key properties:
- Works as a **tool inside VS Code**
- **No repo cloning required for users**
- Installable via **npm / npx**
- Continuously evolving via your GitHub repo
- Focused on **design reasoning**, not just components

---

## 🧠 Core Idea

You are NOT building a frontend project.

You are building:
> A **Design Intelligence Engine** exposed via MCP tools

Flow:
User prompt → Agent → MCP tools → Structured UI decisions → Code generation

---

## 🏗️ Final Architecture

GitHub Repo (source of truth)
→ publish to npm
→ user runs via npx (local MCP server)
→ VS Code agent connects via Command (stdio)

Optional later:
Local MCP → Remote API (for shared intelligence)

---

## 📦 Distribution Strategy (Important Decision)

DO NOT require users to clone repo.

Instead:

- Publish as npm package: `ui-mcp-assistant`
- Users run:
  - `npx ui-mcp-assistant` (no install)
  - OR install globally

This removes friction completely.

---

## 🧩 Project Structure

Keep it clean and scalable:

- `/src/server.ts` → MCP entry point
- `/src/tools/` → tool logic (design intelligence)
- `/src/content/` → UI rules (JSON knowledge base)
- `/dist/` → compiled output

---

## 🛠️ Core Tools (V1)

Keep only 3 tools initially:

### 1. design_page (MAIN TOOL)
Purpose:
- Generate full UI strategy

Input:
- audience (who is using it)
- goal (what they want to do)
- emphasis (clarity, conversion, etc.)

Output:
- layout
- typography
- color strategy
- components
- reasoning

---

### 2. choose_palette
Purpose:
- Suggest color system based on mood/brand

---

### 3. improve_ui
Purpose:
- Critique an existing UI and suggest improvements

---

## 🧠 Design Thinking Model (CRITICAL)

All tools must follow this logic:

User Intent → Constraints → Design Decisions → Output

NOT:
"return random UI ideas"

---

## ⚙️ MCP Integration (VS Code)

Users will configure:

- MCP Server Type: **Command (stdio)**

Command:
- `npx ui-mcp-assistant`

This runs your server locally inside VS Code.

---

## 🚀 Development Steps (Execute in order)

### Step 1 — Initialize project
- Create Node + TypeScript project
- Setup build script

---

### Step 2 — Implement MCP server
- Use MCP SDK
- Register tools:
  - design_page
  - choose_palette
  - improve_ui

---

### Step 3 — Implement tool logic
Start simple:
- Rule-based outputs (if/else)
- Use JSON content later for scaling

---

### Step 4 — Add CLI support
- Add "bin" entry in package.json
- Make server executable

This enables:
- `npx ui-mcp-assistant`

---

### Step 5 — Test locally
- Run via npx
- Connect in VS Code MCP config
- Verify agent can call tools

---

### Step 6 — Publish to npm
- `npm publish`

Now others can use instantly.

---

## 🔁 Update Strategy

When you improve UI knowledge:

1. Update repo
2. Publish new npm version

Users:
- automatically get updates via npx
- or update package

---

## 🧠 Future Expansion (V2)

Add only after V1 works:

- generate_component_prompt → Tailwind/React code prompts
- layout_strategy → deeper layout logic
- accessibility_check → usability improvements
- personalization layer → user preferences

---

## 🌐 Optional (Later, NOT now)

Add remote server when you need:
- analytics
- shared intelligence
- instant updates without npm publish

Architecture:
Local MCP → calls hosted API

---

## ❌ What NOT to Do

- Don’t start with cloud hosting
- Don’t require repo cloning
- Don’t overbuild tools early
- Don’t focus on frontend first

---

## ✅ What Success Looks Like

Inside VS Code, you can say:

"Design a dashboard for students focusing on clarity"

→ Agent calls your MCP  
→ MCP returns structured design decisions  
→ Agent generates UI code  

You:
- don’t think about layout
- don’t guess colors
- don’t start from blank

---

## 🔥 Final Outcome

You now have:

- A **personal UI design brain**
- A **reusable dev tool**
- A **sharable npm package**
- A system that improves over time

---

## 👉 Next Action

Start with:
- Step 1 (project setup)
- Step 2 (MCP server + 1 tool only: design_page)

Keep it minimal. Get it working. Then expand.

---