# Typography System Rules
> Source of truth for typography decisions in React + Tailwind projects.
> Enforced via the ui-craft MCP. Update this file to update all connected agents.

---

## 1. Font Role System

Every project uses exactly three font roles. No exceptions.

| Role | Purpose | When to use |
|---|---|---|
| `--font-ui` | Interface chrome | Buttons, labels, nav, forms, tables, dashboards |
| `--font-display` | Marketing / brand | Hero headlines, landing pages, splash screens |
| `--font-mono` | Code and data | Code blocks, API keys, IDs, terminal output |

### Recommended font assignments

```css
/* tailwind.config.ts → theme.extend.fontFamily */
ui:      ['Inter', 'system-ui', '-apple-system', 'sans-serif']
display: ['Geist', 'Inter', 'system-ui', 'sans-serif']       /* swap for your brand font */
mono:    ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace']
```

### Rules
- NEVER use `--font-display` in UI chrome (buttons, inputs, nav, tables)
- NEVER use `--font-mono` for any prose or UI text
- If no brand font is available, `--font-display` = `--font-ui` (one font is fine)
- System font stack (`-apple-system, BlinkMacSystemFont, Segoe UI`) is always acceptable for `--font-ui` — it loads instantly, feels native, zero FOUT

---

## 2. Type Scale

Define these as Tailwind tokens. Never use arbitrary values like `text-[15px]` or `text-[13.5px]` — if you need an arbitrary size, the scale is missing a step.

### Product UI scale (1.25× ratio · base 16px)

```ts
// tailwind.config.ts
fontSize: {
  'display': ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.03em', fontWeight: '700' }], // 48px
  'h1':      ['2rem',    { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }], // 32px
  'h2':      ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }], // 24px
  'h3':      ['1.125rem',{ lineHeight: '1.3',  letterSpacing: '0',       fontWeight: '500' }], // 18px
  'h4':      ['1rem',    { lineHeight: '1.4',  letterSpacing: '0',       fontWeight: '500' }], // 16px
  'body':    ['1rem',    { lineHeight: '1.65', letterSpacing: '0',       fontWeight: '400' }], // 16px
  'body-sm': ['0.875rem',{ lineHeight: '1.6',  letterSpacing: '0',       fontWeight: '400' }], // 14px
  'caption': ['0.75rem', { lineHeight: '1.5',  letterSpacing: '0',       fontWeight: '400' }], // 12px
  'overline':['0.6875rem',{lineHeight: '1.2',  letterSpacing: '0.08em',  fontWeight: '500' }], // 11px
}
```

### Scale usage by UI element

| Element | Token | Notes |
|---|---|---|
| Page title | `text-h1` | One per page |
| Section heading | `text-h2` | Major sections only |
| Card / panel heading | `text-h3` | |
| Form group label | `text-h4` | |
| Body copy | `text-body` | Min for readable paragraphs |
| Supporting copy | `text-body-sm` | Descriptions, metadata |
| Timestamp / footnote | `text-caption` | |
| Category label | `text-overline` | Always paired with `uppercase` |
| Hero headline | `text-display` | Marketing contexts only |

### Perceivable jump rule
Adjacent scale levels must look visually distinct when placed side by side.
If two levels look the same size, the scale is broken — increase the ratio or remove the level.
Minimum perceivable jump: **2px** between adjacent steps.

---

## 3. Font Weight

Use at most **two weights** in any UI component. Three weights maximum across an entire page.

| Weight | Token | Use |
|---|---|---|
| 400 | `font-normal` | All body and UI text |
| 500 | `font-medium` | Emphasis, headings H3–H4, labels, active states |
| 600 | `font-semibold` | Headings H1–H2 only |
| 700 | `font-bold` | Display headlines only (32px+) |

### Rules
- NEVER use `font-bold` on body text — it reads like shouting
- NEVER use `font-bold` at sizes below 16px — ink trapping reduces legibility at small sizes
- Weight alone is not sufficient to distinguish interactive from non-interactive text — also add color or underline
- `font-medium` (500) is the workhorse for UI — prefer it over bold for component labels

---

## 4. Color — Three-level text hierarchy

Every UI needs exactly three text color levels. Define them as CSS variables.

```css
/* globals.css */
:root {
  --text-primary:   #09090B;   /* main content — ~18:1 contrast on white */
  --text-secondary: #52525B;   /* supporting info — ~5.7:1, passes WCAG AA */
  --text-tertiary:  #A1A1AA;   /* metadata, decorative — ~2.8:1, decorative only */
  --text-disabled:  #D4D4D8;   /* disabled states */
  --text-link:      #2563EB;   /* links and interactive */
  --text-danger:    #DC2626;   /* errors */
  --text-success:   #16A34A;   /* success states */
  --text-warning:   #D97706;   /* warnings */
}
.dark {
  --text-primary:   #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-tertiary:  #71717A;
  --text-disabled:  #52525B;
  --text-link:      #60A5FA;
  --text-danger:    #F87171;
  --text-success:   #4ADE80;
  --text-warning:   #FCD34D;
}
```

```ts
// tailwind.config.ts → theme.extend.colors
textColor: {
  primary:   'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  tertiary:  'var(--text-tertiary)',
  disabled:  'var(--text-disabled)',
  link:      'var(--text-link)',
  danger:    'var(--text-danger)',
  success:   'var(--text-success)',
  warning:   'var(--text-warning)',
}
```

### Usage: `text-primary`, `text-secondary`, `text-tertiary`

### Rules
- NEVER use `text-tertiary` for interactive or meaningful text — it fails WCAG AA
- NEVER use `text-primary` for placeholder text — use `text-tertiary`
- Color is NOT the only differentiator for interactive elements — always pair with underline or border
- Semantic colors (danger, success, warning) must be paired with an icon — never color alone

---

## 5. Opacity

Opacity is for component state changes, not text hierarchy. Use color tokens for hierarchy.

| Use case | Value | Class |
|---|---|---|
| Disabled elements | 0.4 | `opacity-40` |
| Placeholder / hint text | 0.5 | `opacity-50` |
| De-emphasised elements | 0.65 | `opacity-65` |
| Active / full | 1.0 | `opacity-100` |

### Rules
- NEVER use opacity for text hierarchy — use `text-secondary` / `text-tertiary` tokens instead
- Opacity affects the ENTIRE element (border, background, text) — when you only want to dim text, use a lower-contrast color token
- Always add `cursor-not-allowed` alongside `opacity-40` on disabled elements
- The Linear pattern: use opacity-based hierarchy in dark mode for automatic adaptation

---

## 6. Letter Spacing

Letter spacing has exactly three correct uses. Everything else is wrong.

| Context | Value | Tailwind | Rule |
|---|---|---|---|
| Display headlines (48px+) | −0.03em to −0.04em | `tracking-tight` or `tracking-tighter` | Compensates for optical looseness at large sizes |
| Large headings (32px+) | −0.02em | `tracking-tight` | |
| Body / UI text | 0 | `tracking-normal` | NEVER change — font designer set this |
| ALL-CAPS overlines | +0.06em to +0.12em | `tracking-widest` | Compensates for optical tightness of capitals |

### Rules
- NEVER add positive letter-spacing to mixed-case text — it looks amateur and reduces readability
- NEVER add negative letter-spacing below 24px — it causes characters to collide
- ALL-CAPS text REQUIRES `tracking-wide` or `tracking-widest` to be readable
- When in doubt: touch nothing — `tracking-normal` is always correct

---

## 7. Line Height

| Context | Value | Tailwind |
|---|---|---|
| Display / H1 (tight) | 1.1–1.2 | `leading-none` to `leading-tight` |
| H2–H3 headings | 1.25–1.35 | `leading-snug` |
| Body copy | 1.5–1.65 | `leading-relaxed` |
| Long-form articles | 1.7–1.85 | `leading-loose` |
| UI labels / buttons | 1.0–1.2 | `leading-none` to `leading-tight` |
| Code blocks | 1.6–1.75 | `leading-relaxed` |

### Rules
- NEVER use `leading-none` (line-height: 1) on body text — lines will collide on descenders
- NEVER use `leading-loose` (line-height: 2) on headings — looks like double-spaced Word documents
- Line height is a READING COMFORT tool, not a spacing tool — don't use it to push elements apart, use margin/padding

---

## 8. Line Length (Measure)

```css
/* Apply to all reading containers */
.prose, .body-copy, article p {
  max-width: 65ch;
}
```

| Context | Max width | Reason |
|---|---|---|
| Long-form articles | 60–65ch | Optimal reading comfort |
| UI body copy | 65–70ch | Slightly looser, still readable |
| Captions / helper text | 45–55ch | Short lines read fine |
| Headlines | Unconstrained | Too short to matter |
| UI chrome (labels, nav) | Unconstrained | Not prose — scanning, not reading |

### Rules
- NEVER let body paragraphs run full viewport width — 100vw is unreadable at desktop widths
- `ch` unit is preferred over `px` because it scales with font size changes
- This rule applies to content areas ONLY — sidebars, navs, and data tables are exempt

---

## 9. Text Alignment

| Context | Alignment | Rule |
|---|---|---|
| Body paragraphs | Left | Always |
| UI labels, descriptions | Left | Always |
| Hero / marketing taglines (≤2 lines) | Center | Only for short standalone copy |
| Empty state messages (≤2 lines) | Center | Only with an icon above |
| Toast notifications | Left | Always |
| Table cells — text | Left | Always |
| Table cells — numbers | Right | Always — enables column scanning |
| Buttons | Center | Always |

### Rules
- NEVER justify text on the web — CSS justification creates rivers of whitespace
- NEVER center-align paragraphs — only short, isolated copy (1–2 lines max)
- Center alignment must be intentional and rare — if everything is centered, nothing is

---

## 10. Company Reference Patterns

Study these when making decisions. Each connects typography directly to business outcomes.

### Apple — tight tracking, generous line height
- Font: SF Pro (proprietary), system-ui fallback
- Pattern: `font-weight: 700`, `letter-spacing: -0.04em` on hero text. Body at `line-height: 1.5`, never denser.
- Business connection: premium perception — the tight headline tracking is now synonymous with Apple quality
- Takeaway: marketing type can be expressive; product type stays neutral

### Google (Material Design 3) — functional, role-based
- Font: Google Sans (headings), Roboto (UI), both humanist sans
- Pattern: Five named roles — Display / Headline / Title / Body / Label — each with Large/Medium/Small
- Business connection: scales across Android, web, and TV without inconsistency
- Takeaway: naming roles (not sizes) forces intentional usage

### Linear — density with opacity hierarchy
- Font: Inter throughout, no display font
- Pattern: 11–13px labels, `opacity-90` primary / `opacity-65` secondary / `opacity-40` tertiary
- Business connection: "professional tool" perception — developers pay premium for dense, precise UIs
- Takeaway: opacity hierarchy adapts automatically to dark mode — no separate dark tokens needed for text

### Stripe — expressive marketing, neutral product
- Font: Söhne (marketing), Inter (dashboard)
- Pattern: Marketing headlines at `font-weight: 700`, `letter-spacing: -0.03em`. Dashboard at `font-weight: 400/500` only.
- Business connection: the gap between expressive marketing and calm product type signals "trustworthy financial tool"
- Takeaway: the tone of your product type says as much as the content

### Vercel / Geist — developer-first, open-source influence
- Font: Geist Sans + Geist Mono (both open-source, available on Google Fonts)
- Pattern: slightly condensed proportions, space-efficient, premium without being cold
- Business connection: became the default in Next.js 14+ — type became infrastructure
- Takeaway: investing in type system pays compound interest — every project using Next.js promotes it

### Anthropic / Claude — calm authority
- Font: Anthropic Sans (proprietary), system mono fallback for code
- Pattern: 400/500 weights only in UI, never 700. `letter-spacing: -0.02em` on headings. No aggressive contrast in type.
- Business connection: AI product that needs to feel intelligent but not intimidating
- Takeaway: restraint in weight (never bold) communicates confidence without aggression

---

## 11. Anti-Patterns — Never Do These

```
FLAT HIERARCHY
Bad:  All text is 14px / font-weight: 400 / same color
Why:  Users cannot scan — every element competes equally
Fix:  Apply at least 3 distinct size/weight/color levels per screen

ALL-CAPS BODY TEXT
Bad:  <p className="uppercase">Terms and conditions apply...</p>
Why:  ALL CAPS removes word shape silhouettes — reading speed drops ~12%
Fix:  Reserve uppercase for overlines (11px, tracking-widest) only

BOLD ON SMALL TEXT
Bad:  <span className="text-xs font-bold">Error message</span>
Why:  Bold at 11–12px causes ink trapping — counters (a, e, o) fill in visually
Fix:  Use font-medium (500) at small sizes, reserve bold for 16px+

LOW-CONTRAST "DESIGN CHOICE"
Bad:  text-gray-300 on white background (#D1D5DB = 1.6:1 — fails WCAG)
Why:  10% of users have some form of visual impairment
Fix:  text-secondary (#52525B) minimum for any meaningful text

ARBITRARY SIZE VALUES
Bad:  className="text-[13.5px]" or className="text-[15px]"
Why:  Breaks the scale — 6 developers each pick different "between" sizes
Fix:  Add a missing token to the scale config instead

LETTER-SPACING ON BODY
Bad:  <p className="tracking-wide">This paragraph has wide tracking...</p>
Why:  Increases visual noise, reduces reading speed — font designer already set spacing
Fix:  tracking-normal on all body and mixed-case UI text. Always.

JUSTIFIED TEXT
Bad:  <p className="text-justify">Long paragraph...</p>
Why:  CSS justification creates irregular word spacing — "rivers" of whitespace
Fix:  text-left always for paragraphs

CENTER-ALIGNED PARAGRAPHS
Bad:  <p className="text-center">This is a long description that spans multiple lines...</p>
Why:  Ragged left edge makes each line's start position unpredictable — hard to read
Fix:  text-center only for 1–2 line standalone copy (hero taglines, empty states)
```

---

## 12. Implementation Checklist

Run this before shipping any new page or component.

### Scale
- [ ] All font sizes use defined tokens — no arbitrary `text-[Npx]` values
- [ ] Adjacent heading levels are visually distinct when placed side by side
- [ ] `text-display` is used only in marketing/hero contexts

### Hierarchy
- [ ] Every screen has at least 3 distinct visual levels (size, weight, or color)
- [ ] Primary action / most important content is visually dominant
- [ ] There is no element competing for "most important" with the actual primary element

### Weight
- [ ] No `font-bold` on text below 16px
- [ ] No `font-bold` on body copy or descriptions
- [ ] At most 2 weights used within any single component

### Color
- [ ] No `text-tertiary` on interactive or meaningful text
- [ ] Semantic colors (danger, success) always paired with an icon
- [ ] All text passes WCAG AA contrast (4.5:1 normal, 3:1 large)

### Spacing
- [ ] Body copy containers have `max-width: 65ch`
- [ ] More space above headings than below (heading belongs to content that follows)
- [ ] No `letter-spacing` on mixed-case body or UI text

### Alignment
- [ ] No justified text
- [ ] No center-aligned paragraphs (>2 lines)
- [ ] Numbers in tables are right-aligned

### Accessibility
- [ ] No color as the only differentiator for interactive text (underline or border also present)
- [ ] No `opacity-40` on text that carries meaning without `aria-disabled` or equivalent
- [ ] Font size minimum 16px for body, 14px absolute floor for any text

---

*Add new rules to this file as the project evolves. The MCP server reads this at call time — no redeployment needed.*