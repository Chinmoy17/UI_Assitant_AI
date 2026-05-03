# UI Psychology Lab — Modularization Plan

## Goal
Convert the monolithic `UI_Psychology_Lab_Enhanced.html` into a maintainable **React + TypeScript + Tailwind CSS** project hosted at `ui-psychology-lab/`.

---

## Tech Stack
| Tool | Purpose |
|------|---------|
| Vite | Build tool (fast HMR, TS support) |
| React 18 | Component model |
| TypeScript | Type safety for future MCP integration |
| Tailwind CSS v4 | Utility-first styling with custom palette |
| npm | Package management |

---

## Folder Structure
```
ui-psychology-lab/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          ← root grid wrapper
│   │   │   └── Sidebar.tsx         ← nav links + branding
│   │   ├── shared/
│   │   │   ├── Callout.tsx         ← reusable callout box
│   │   │   ├── DemoBox.tsx         ← demo container with label
│   │   │   └── StatBadge.tsx       ← monospace stat pill
│   │   └── sections/
│   │       ├── Introduction.tsx
│   │       ├── PreattentiveVision.tsx
│   │       ├── GestaltPrinciples.tsx
│   │       ├── CognitiveLoad.tsx
│   │       ├── VisualHierarchy.tsx
│   │       ├── SquintTest.tsx
│   │       ├── FittsLaw.tsx
│   │       ├── HicksLaw.tsx
│   │       ├── Typography.tsx
│   │       ├── ColorContrast.tsx
│   │       ├── FPattern.tsx
│   │       ├── Affordance.tsx
│   │       ├── FeedbackLatency.tsx
│   │       ├── AnchoringBias.tsx
│   │       ├── HaloEffect.tsx
│   │       └── Synthesis.tsx
│   ├── data/
│   │   └── navigation.ts           ← section registry (id, label, component ref)
│   ├── App.tsx                     ← activeSection state + navigation
│   ├── main.tsx
│   └── index.css                   ← Tailwind import + CSS vars for complex states
├── tailwind.config.ts
└── vite.config.ts
```

---

## Color Palette (Tailwind custom theme)
Maps the original CSS variables:
```
bg          → #0b0d10
surface     → #14171c
surface-2   → #1c2026
border-col  → #2a2f37
text-base   → #e6e8eb
text-dim    → #8b919a
accent      → #6366f1
accent-h    → #7c7ff5
success     → #10b981
danger      → #ef4444
warning     → #f59e0b
```

---

## Navigation Architecture
- `App.tsx` holds `activeSection: string` state
- `Sidebar` receives `activeSection` + `onNavigate(id: string)` props
- `data/navigation.ts` is the **single registry** — add a new entry here to create a new page
- Each section is a self-contained React component with its own state/refs

---

## Interactive Demo Strategy
| Original | React equivalent |
|----------|-----------------|
| `onclick="fn()"` | `onClick` handler |
| `document.getElementById` | `useRef` |
| `setTimeout` | `useEffect` cleanup |
| Global vars (fittsHits, etc.) | `useState` inside component |

---

## Execution Steps
1. [x] Write plan.md
2. [ ] Scaffold Vite project (`npm create vite@latest`)
3. [ ] Install Tailwind CSS v4 + configure
4. [ ] Build shared components (Callout, DemoBox, StatBadge)
5. [ ] Build Layout + Sidebar
6. [ ] Port each of the 14 sections (+ intro + synthesis = 16 total)
7. [ ] Wire App.tsx navigation state
8. [ ] Verify `npm run dev` builds and runs

---

## Future Phases
- **Phase 2:** Add richer content per section (diagrams, code examples, quizzes)
- **Phase 3:** Theme switcher (light/dark/high-contrast)
- **Phase 4:** MCP server that reads section data and advises coding agents on UI decisions
