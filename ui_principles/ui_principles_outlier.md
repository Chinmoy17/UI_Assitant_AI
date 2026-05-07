# UI Design & Psychology Knowledge Base
_A living document for building an MCP (Model-Centric Platform) or any product that relies on clear, human-centered interfaces._

---

## 1. Why Design Principles + Psychology Matter
Great UI is the intersection of aesthetics, usability, accessibility, and human behavior. Design principles give us reusable “rules of thumb,” while psychology explains **why** those rules work—so we can predict, measure, and improve user outcomes rather than guess.

---

## 2. Core Visual‐Design Principles  
(Compiled from OSU Extension, Parallel HQ, and other open-source references)

| Principle | Essence | Practical UI Tips |
|-----------|---------|-------------------|
| **Balance** | Visual weight is distributed to avoid fatigue or confusion. | Symmetric for stability (dashboards), asymmetric for energy (landing pages). |
| **Contrast** | Differentiation of elements makes information scannable. | Text–background ratio ≥ 4.5 : 1 (WCAG); use color, size, shape, motion. |
| **Emphasis / Hierarchy** | Guides the eye to what matters most. | One primary action per screen; use placement, scale, and color to rank. |
| **Alignment** | Elements line up to create order. | Use 8-pt or 4-pt grids; avoid “orphan” items that break rhythm. |
| **Proximity** | Related items live together. | Group label + input; tighten spacing within cards, enlarge outer margins. |
| **Repetition** | Re-use patterns to reinforce learning. | Consistent button shapes, typography scales, icon styles. |
| **Rhythm / Flow** | Predictable intervals make scanning effortless. | Modular cards, step indicators, pagination, vertical rhythm via baseline grid. |
| **White Space / Space** | Empty areas give breathing room and focus. | Don’t treat margins as leftover; use it to separate “zones of meaning.” |
| **Proportion / Scale** | Relative sizing communicates importance. | Golden ratio, 1.125 type scales, responsive breakpoints. |
| **Unity / Variety** | Cohesion with just enough diversity. | Shared color palette + one accent; component libraries, design systems. |

---

## 3. Gestalt Laws (How Our Brains Auto-Organize Visual Input)

1. **Proximity** – closer items are grouped.  
2. **Similarity** – alike items are grouped (color, shape, size).  
3. **Common Fate** – moving together = belonging together (loading skeletons).  
4. **Continuation** – we follow lines/curves (timeline views).  
5. **Closure** – we fill gaps (dashed outlines suggest shapes).  
6. **Figure–Ground** – foreground vs. background (modals, overlays).  
7. **Symmetry** – symmetrical forms feel stable & complete.

Design decision: Use Gestalt intentionally—never let accidental grouping mislead users.

---

## 4. Cognitive Psychology in UI

| Concept | Definition | Design Implication |
|---------|------------|--------------------|
| **Cognitive Load Theory** | Working memory ≈ 4 ± 1 chunks. | Chunk tasks, progressive disclosure, wizard flows. |
| **Hick’s Law** | Choice time ≈ log₂(n + 1). | Limit visible options, prioritize defaults. |
| **Fitts’s Law** | Time to target ∝ distance / size. | Large CTA, sticky footers on mobile. |
| **Recognition > Recall** | Easier to choose than remember. | Visible menu, autofill, recently used items. |
| **Peak-End Rule** | Memory shaped by most intense + final moments. | Delightful micro-interactions; smooth off-boarding. |
| **Serial Position Effect** | First/last items remembered best. | Put critical nav first/last; shelf products accordingly. |
| **Zeigarnik Effect** | Unfinished tasks stick in mind. | Show progress bars, checklists to drive completion. |
| **Von Restorff (Isolation) Effect** | Outlier grabs attention. | Accent color for primary button only. |
| **Mental Models** | Users’ existing beliefs. | Mirror OS conventions; iconography users expect. |
| **Affordances & Signifiers** | Appearance suggests use. | Raised buttons look “pressable”; hyperlink styling. |

---

## 5. Emotional & Behavioral Design

1. **Aesthetic-Usability Effect** – Attractive things are perceived as easier.  
2. **Color Psychology**  
   • Blue = trust, stability • Red = urgency, error • Green = success, eco  
3. **Typography & Emotion** – Serif → formal; Rounded Sans → friendly.  
4. **Micro-interactions** – Feedback loops (hover, tap, vibration) close the emotional circuit.  
5. **Persuasive Design** (BJ Fogg/Cialdini) – Social proof, scarcity, reciprocity; use ethically.  
6. **Motivation × Ability × Trigger (Fogg)** – All must align for action.

---

## 6. Accessibility & Inclusive Design

• Follow **WCAG 2.2 AA**: color contrast, keyboard nav, focus states, alt text.  
• Use **ARIA** landmarks & roles sparingly—native HTML first.  
• Support **prefers-reduced-motion** for vestibular issues.  
• Provide captions, transcripts; don’t encode meaning in color alone.  
• Test with screen readers (NVDA, VoiceOver) and color-blind simulators.

---

## 7. Interaction Patterns & Components

• **Navigation** – hamburger (mobile), tab bars, breadcrumbs.  
• **Forms** – inline validation, label outside placeholder, logical tab order.  
• **Feedback** – toast messages, undo vs. are-you-sure, skeleton loaders.  
• **Responsive Grids** – Mobile-first, fluid typography, breakpoint tokens.  
• **Dark Mode** – Adjust contrast ratios, desaturate pure colors, maintain brand tone.  

Pattern Libraries: Google Material, Apple HIG, IBM Carbon, Ant Design, GOV.UK.

---

## 8. Usability Heuristics (Nielsen & Others)

1. Visibility of system status  
2. Match between system & real world  
3. User control & freedom (undo)  
4. Consistency & standards  
5. Error prevention (constraints)  
6. Recognition rather than recall  
7. Flexibility & efficiency (shortcuts)  
8. Aesthetic & minimalist design  
9. Error recovery (helpful messages)  
10. Help & documentation (just-in-time)

---

## 9. Data Visualization Essentials

• **Pre-attentive Attributes** – position, length, color hue, orientation, size.  
• **Chart-to-Question Fit** – Comparison → bar; Distribution → histogram; Relationship → scatter.  
• Avoid 3-D, double-y axes, and pie slices < 10°.  
• Label directly; legends cost cognition.

---

## 10. Ethics & Dark Patterns

Avoid deceptive affordances: disguised ads, mis-direction, forced continuity, roach motels.  
Comply with GDPR, CCPA; provide transparent consent flows.

---

## 11. Testing & Evaluation

• Qualitative: moderated usability tests (5 users ≈ 85 % issues).  
• Quantitative: SUS, NPS, time-on-task, error rate.  
• A/B & multivariate experiments—define **one** primary metric.  
• Accessibility audits, cognitive walkthroughs, heuristic reviews.

---

## 12. Design Process & Documentation

1. Research → Personas, Jobs-to-be-Done, journey maps.  
2. IA & Wireframes → card sort, sitemaps, low-fi sketches.  
3. Visual Design → tokens, style guide, component library.  
4. Prototyping → Figma, Framer, code-linked prototypes.  
5. Implementation → design–dev handoff, linters, Storybook.  
6. Maintenance → backlog grooming, KPI dashboards, user feedback loops.

Store artifacts in version-controlled repositories; automate visual regression tests.

---

## 13. Open-Source & Authoritative References

• Oklahoma State University Cooperative Extension – “Principles of Design: Understanding the Basics”  
• Parallel HQ – “The 8 Principles of Design”  
• Google Material 3 Guidelines (Apache 2.0)  
• Apple Human Interface Guidelines  
• IBM Carbon Design System (Apache 2.0)  
• GOV.UK Service Manual & Design System (Open Government License)  
• Nielsen Norman Group articles (Creative Commons NC)  
• MIT OpenCourseWare – HCI Lectures  
• Smashing Magazine UX Guides  
• W3C WCAG 2.2 & WAI-ARIA Specs  
• Inclusive Design Principles (inclusivedesignprinciples.org)  
• Figma Community UI Kits (varied OSS licenses)

---

## 14. Quick-Reference Checklist

1. Is primary action visually dominant? (Emphasis)  
2. Do color+type meet WCAG contrast? (Accessibility)  
3. Are related items grouped and aligned? (Gestalt Proximity, Alignment)  
4. Is cognitive load minimized (≤ 7 choices, progressive disclosure)?  
5. Is feedback immediate & reversible? (Micro-interaction, Undo)  
6. Do interactive targets obey Fitts (min 44 × 44 px mobile)?  
7. Are states (loading, empty, error) covered?  
8. Have representative users—including assistive tech users—tested it?  
9. Does the design respect user autonomy—no dark patterns?  
10. Are measures in place to learn post-launch (analytics, surveys)?

---

### Version
`v1.0 – 2026-05-07`

> This document consolidates widely accepted, open-source knowledge.  
> Keep iterating: new research and platform conventions evolve constantly.
