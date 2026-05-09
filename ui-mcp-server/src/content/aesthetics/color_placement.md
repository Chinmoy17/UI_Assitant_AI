
# Color System & Component Placement Rules
> Source of truth for color decisions and spatial layout in React + Tailwind projects.
> Enforced via the ui-craft MCP. Update this file to update all connected agents.

---

## 1. Color Role System

Every color in a UI has a role. Never use a raw hex value outside of a token definition.
The role system has four layers: **Background → Surface → Border → Content**.

```
┌─────────────────────────────────────────┐  ← bg-base (page background)
│  ┌───────────────────────────────────┐  │  ← bg-surface (card / panel)
│  │  ┌─────────────────────────────┐  │  │  ← bg-subtle (input / inner section)
│  │  │  text / icon / border       │  │  │  ← content layer
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Token definitions

```css
/* globals.css */
:root {
  /* ── Backgrounds ── */
  --bg-base:        #FFFFFF;   /* page background */
  --bg-surface:     #FAFAFA;   /* cards, panels, sidebars */
  --bg-subtle:      #F4F4F5;   /* inputs, inner sections, code blocks */
  --bg-muted:       #E4E4E7;   /* skeleton loaders, dividers */
  --bg-overlay:     rgba(0,0,0,0.5); /* modal backdrop */

  /* ── Borders ── */
  --border-default: #E4E4E7;   /* default card / input border */
  --border-strong:  #D4D4D8;   /* emphasized separator */
  --border-focus:   #6366F1;   /* focus ring color */
  --border-danger:  #FCA5A5;   /* error state border */
  --border-success: #86EFAC;   /* success state border */

  /* ── Interactive / Accent ── */
  --accent:         #6366F1;   /* primary brand — buttons, links, active */
  --accent-hover:   #4F46E5;   /* hover state */
  --accent-active:  #4338CA;   /* pressed / active state */
  --accent-subtle:  #EEF2FF;   /* tinted background for accent elements */
  --accent-text:    #4338CA;   /* accent text on white (7:1 contrast) */

  /* ── Semantic ── */
  --color-danger:         #DC2626;
  --color-danger-subtle:  #FEF2F2;
  --color-danger-border:  #FCA5A5;
  --color-success:        #16A34A;
  --color-success-subtle: #F0FDF4;
  --color-success-border: #86EFAC;
  --color-warning:        #D97706;
  --color-warning-subtle: #FFFBEB;
  --color-warning-border: #FDE68A;
  --color-info:           #2563EB;
  --color-info-subtle:    #EFF6FF;
  --color-info-border:    #BFDBFE;
}

.dark {
  --bg-base:        #09090B;
  --bg-surface:     #18181B;
  --bg-subtle:      #27272A;
  --bg-muted:       #3F3F46;
  --bg-overlay:     rgba(0,0,0,0.7);

  --border-default: #27272A;
  --border-strong:  #3F3F46;
  --border-focus:   #818CF8;
  --border-danger:  #7F1D1D;
  --border-success: #14532D;

  --accent:         #818CF8;
  --accent-hover:   #6366F1;
  --accent-active:  #4F46E5;
  --accent-subtle:  #1E1B4B;
  --accent-text:    #A5B4FC;

  --color-danger:         #F87171;
  --color-danger-subtle:  #1C0A0A;
  --color-danger-border:  #7F1D1D;
  --color-success:        #4ADE80;
  --color-success-subtle: #052E16;
  --color-success-border: #14532D;
  --color-warning:        #FCD34D;
  --color-warning-subtle: #1C1400;
  --color-warning-border: #78350F;
  --color-info:           #60A5FA;
  --color-info-subtle:    #0C1A3A;
  --color-info-border:    #1E3A5F;
}
```

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg: {
        base:    'var(--bg-base)',
        surface: 'var(--bg-surface)',
        subtle:  'var(--bg-subtle)',
        muted:   'var(--bg-muted)',
        overlay: 'var(--bg-overlay)',
      },
      border: {
        default: 'var(--border-default)',
        strong:  'var(--border-strong)',
        focus:   'var(--border-focus)',
        danger:  'var(--border-danger)',
        success: 'var(--border-success)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        hover:   'var(--accent-hover)',
        active:  'var(--accent-active)',
        subtle:  'var(--accent-subtle)',
        text:    'var(--accent-text)',
      },
      danger: {
        DEFAULT: 'var(--color-danger)',
        subtle:  'var(--color-danger-subtle)',
        border:  'var(--color-danger-border)',
      },
      success: {
        DEFAULT: 'var(--color-success)',
        subtle:  'var(--color-success-subtle)',
        border:  'var(--color-success-border)',
      },
      warning: {
        DEFAULT: 'var(--color-warning)',
        subtle:  'var(--color-warning-subtle)',
        border:  'var(--color-warning-border)',
      },
      info: {
        DEFAULT: 'var(--color-info)',
        subtle:  'var(--color-info-subtle)',
        border:  'var(--color-info-border)',
      },
    }
  }
}
```

---

## 2. The 60 / 30 / 10 Color Rule

| Layer | % of screen | What goes here |
|---|---|---|
| 60% | Dominant | Page background, large surface areas |
| 30% | Secondary | Cards, sidebars, panels, secondary buttons |
| 10% | Accent | Primary buttons, active states, links, highlights |

### Rules
- NEVER exceed 10% accent color on any page — if it's everywhere, it signals nothing
- NEVER use more than one accent color per product — two accent colors require explicit brand justification
- The 30% layer creates depth through surface elevation, not color variety
- On dark mode: the 60% is darkest, 30% is slightly lighter, 10% is your accent

---

## 3. Surface Elevation System

Depth is created through background color steps, not shadows. Shadows are supplemental.

```
Level 0 — bg-base      (#FFFFFF / #09090B)   Page background
Level 1 — bg-surface   (#FAFAFA / #18181B)   Cards, sidebars, nav
Level 2 — bg-subtle    (#F4F4F5 / #27272A)   Inputs, inner panels, code
Level 3 — bg-muted     (#E4E4E7 / #3F3F46)   Skeletons, disabled fills
```

### Shadow scale (supplemental — used with elevation, not instead of it)

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.04);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.04);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.04);
```

| Element | Shadow level |
|---|---|
| Inline card on bg-base | `shadow-xs` + `border-default` |
| Floating card / popover | `shadow-md` |
| Dropdown menu | `shadow-lg` |
| Modal / dialog | `shadow-xl` |
| Tooltip | `shadow-md` |
| Sticky header | `shadow-sm` |

### Rules
- NEVER use heavy shadows (`shadow-xl`) on flat, inline elements — reserve for floating layers
- In dark mode: reduce shadow opacity by 50% — dark surfaces naturally recede
- Border + subtle background is enough for inline cards — no shadow needed
- Shadows should communicate Z-axis position, not decoration

---

## 4. Contrast Requirements

| Text type | Minimum contrast | WCAG level |
|---|---|---|
| Normal text (< 18px / < 14px bold) | 4.5:1 | AA |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 | AA |
| UI components (borders, icons) | 3:1 | AA |
| Decorative / disabled | No requirement | — |
| Target: normal text | 7:1 | AAA |

### Quick contrast reference

```
#09090B on #FFFFFF  →  21:1   ✅ Primary text
#52525B on #FFFFFF  →  7.4:1  ✅ Secondary text
#71717A on #FFFFFF  →  4.6:1  ✅ Barely passes AA
#A1A1AA on #FFFFFF  →  2.6:1  ❌ Fails — decorative only
#6366F1 on #FFFFFF  →  4.9:1  ✅ Accent text passes AA
#FFFFFF on #6366F1  →  4.9:1  ✅ White on accent button passes
```

### Rules
- ALWAYS check contrast when using accent color as text on white
- NEVER use semantic colors (danger red, success green) as background without checking contrast
- Color is NEVER the only signal — always pair with icon, label, or border pattern
- Test with real content at real sizes — small text at 4.51:1 is technically passing but practically uncomfortable

---

## 5. Semantic Color Usage

Semantic colors communicate system state. Their meaning must be consistent across the entire product.

| Color | Meaning | Use for | Never use for |
|---|---|---|---|
| Danger / Red | Destructive, error, irreversible | Delete buttons, error messages, form validation failures | Warnings, information, decorative |
| Success / Green | Completed, saved, confirmed | Success toasts, completion states, positive metrics | Neutral actions, decorative |
| Warning / Amber | Caution, review needed, approaching limit | Rate limit warnings, unsaved changes, expiry alerts | Errors, success states |
| Info / Blue | Neutral information, guidance | Tips, documentation callouts, neutral status | Errors, success, warnings |

### Semantic color pattern (always use all three layers together)

```tsx
// ✅ Correct: subtle bg + border + colored icon/text
<div className="bg-danger-subtle border border-danger-border rounded-lg p-4 flex gap-3">
  <AlertCircle className="text-danger shrink-0 mt-0.5" size={16} />
  <div>
    <p className="text-sm font-medium text-danger">Payment failed</p>
    <p className="text-sm text-secondary mt-1">Your card was declined. Please update your payment method.</p>
  </div>
</div>

// ❌ Wrong: solid danger background — aggressive, hard to read
<div className="bg-danger text-white p-4">Payment failed</div>
```

---

## 6. Button Placement & Hierarchy

### The single most important rule
**One primary button per view.** If two actions are equally important, the design has a problem — resolve it at the product level, not the UI level.

### Button hierarchy

```
Primary   → bg-accent text-white                    — THE action on this view
Secondary → border-default bg-transparent text-primary — supporting action
Ghost     → no border no bg text-secondary           — low priority / cancel
Danger    → bg-danger text-white                    — destructive (separate visually)
Link      → no bg no border text-accent underline   — navigation-style action
```

### Placement patterns

#### Form submission
```
┌────────────────────────────────┐
│  [Form fields]                 │
│                                │
│              [Cancel] [Submit] │  ← right-aligned, cancel left of submit
└────────────────────────────────┘
```
- Primary on the right — matches left-to-right reading flow
- Cancel/secondary always LEFT of primary
- Destructive action separated by space (not adjacent to primary)

#### Destructive confirmation dialog
```
┌────────────────────────────────┐
│  Are you sure?                 │
│  This cannot be undone.        │
│                                │
│  [Cancel]          [Delete →]  │  ← danger action far right, cancel far left
└────────────────────────────────┘
```
- Maximize distance between cancel and destructive (Fitts's Law — make misclick harder)
- Destructive button is smaller than primary CTAs on other screens

#### Page-level CTA (dashboard / landing)
```
┌──────────────────────────────────────────┐
│  [Primary CTA]  [Secondary CTA]          │  ← left-aligned with content
└──────────────────────────────────────────┘
```
- Left-aligned when accompanying left-aligned content
- Centered only in hero sections with centered text

#### Mobile
```
┌────────────────────┐
│  [Primary — full]  │  ← full width on mobile
│  [Secondary — full]│  ← stacked, primary always on top
└────────────────────┘
```
- Full-width stacked buttons on mobile (< 640px)
- Primary always above secondary when stacked
- Minimum 44px height, 8px gap between stacked buttons

### Button sizing (Fitts's Law applied)

```tsx
// Size tokens
sm:  'h-8  px-3 text-sm  gap-1.5'   // 32px — inline actions, table rows
md:  'h-10 px-4 text-sm  gap-2'     // 40px — default
lg:  'h-12 px-6 text-base gap-2'    // 48px — primary CTA, hero
xl:  'h-14 px-8 text-lg  gap-3'     // 56px — marketing hero only

// Mobile: always at least h-11 (44px) on touch surfaces
```

### Rules
- NEVER two primary buttons side by side
- NEVER place destructive and primary buttons adjacent — always separate them
- NEVER use ghost buttons as primary CTAs — they disappear visually
- ALWAYS define all 5 states: default, hover, focus, disabled, loading
- Destructive actions should be SMALLER and FURTHER from the primary action

---

## 7. Input & Form Layout

### Input anatomy

```
[Label]                          ← always visible, never placeholder-only
[Helper text / optional badge]   ← below label, before input
┌──────────────────────────────┐
│ Placeholder text             │  ← input field
└──────────────────────────────┘
[Error message or character count] ← below input
```

### Input states and colors

```tsx
// Default
'border border-default bg-bg-subtle text-primary placeholder:text-tertiary'

// Focus
'focus:border-border-focus focus:ring-2 focus:ring-accent/20 focus:outline-none'

// Error
'border-border-danger bg-danger-subtle focus:ring-danger/20'

// Disabled
'border-border-default bg-bg-muted text-disabled cursor-not-allowed opacity-60'

// Success
'border-border-success bg-success-subtle'
```

### Form layout patterns

#### Single column (default — always correct)
```
Label
[Input field — full width]
Helper text

Label
[Input field — full width]
```

#### Two column (desktop only, related fields)
```
[First name          ] [Last name           ]
[Email address                              ]
[City                ] [Postal code         ]
```
- Two columns only for genuinely related pairs (first/last name, city/zip)
- NEVER two columns for unrelated fields — it forces the eye to zigzag
- Revert to single column on mobile (< 768px)

#### Inline form (search / subscribe)
```
[Input field                    ] [Submit →]
```
- Button height must match input height exactly
- Works only for single-field forms

### Rules
- Labels always ABOVE inputs — never to the left on mobile
- Helper text BELOW label, before the input (not after)
- Error messages BELOW the input they describe
- Required indicator (*) in label, not in placeholder
- NEVER rely on placeholder as the label — placeholder disappears on focus

---

## 8. Card Component Placement

### Card anatomy layers

```
bg-surface
border-default
border-radius: rounded-xl (12px) for cards, rounded-lg (8px) for inline

┌─────────────────────────────────┐  ← card border
│  [Header area]                  │  ← padding: p-5 or p-6
│  ─────────────────────────────  │  ← optional divider: border-t border-default
│  [Content area]                 │  ← same horizontal padding
│  ─────────────────────────────  │  ← optional footer divider
│  [Footer / actions]             │  ← p-4, slightly reduced
└─────────────────────────────────┘
```

### Card variants by use

| Variant | Background | Border | Shadow | Use |
|---|---|---|---|---|
| Default | `bg-surface` | `border-default` | none | Content cards on bg-base |
| Elevated | `bg-surface` | none | `shadow-md` | Floating elements |
| Subtle | `bg-subtle` | `border-default` | none | Nested / inner cards |
| Interactive | `bg-surface` | `border-default` | `hover:shadow-sm` | Clickable cards |
| Highlighted | `bg-accent-subtle` | `border-accent/30` | none | Featured / selected |
| Danger | `bg-danger-subtle` | `border-danger-border` | none | Error or alert cards |

### Card grid spacing

```tsx
// Content cards grid
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// Dashboard stat cards (fixed smaller size)
<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

// Feature cards (marketing)
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
```

### Rules
- NEVER nest a `bg-surface` card inside another `bg-surface` card — step down to `bg-subtle`
- Interactive cards need hover state: `hover:border-strong hover:shadow-sm transition-all`
- Card padding is consistent: `p-5` (20px) default, `p-6` (24px) for spacious, `p-4` (16px) for dense
- Card border-radius matches its context: `rounded-xl` standalone, `rounded-lg` inside panels

---

## 9. Navigation Placement

### Top navigation (most common)

```
┌────────────────────────────────────────────────────────┐
│ [Logo]   [Nav item] [Nav item] [Nav item]   [CTA btn] │  ← h-16 (64px)
└────────────────────────────────────────────────────────┘
```
- Logo: always top-left
- Primary nav: center or left-of-center
- Auth actions / CTA: always top-right
- Active nav item: accent color text + optional accent underline (2px bottom border)
- Height: 56–64px (h-14 to h-16)

### Sidebar navigation (dashboards / tools)

```
┌─────────────┬──────────────────────────────────┐
│ [Logo]      │                                  │
│ ─────────── │    Main content area             │
│ [Nav item]  │                                  │
│ [Nav item ●]│    ← active state                │
│ [Nav item]  │                                  │
│             │                                  │
│ ─────────── │                                  │
│ [Settings]  │                                  │
│ [User]      │  ← profile/settings always bottom│
└─────────────┴──────────────────────────────────┘
```
- Width: 240px (w-60) default, 280px (w-70) spacious, 64px (w-16) icon-only collapsed
- Active state: `bg-accent-subtle text-accent-text font-medium rounded-lg`
- Hover state: `bg-bg-subtle text-primary`
- Icon size: 16px (w-4) with 8px gap to label
- User profile / settings: pinned to bottom

### Mobile navigation

```
┌────────────────────────────────┐
│ [Logo]                 [Menu ≡]│  ← top bar
└────────────────────────────────┘

─── OR ───

┌────────────────────────────────┐
│                                │
│         Content                │
│                                │
└────────────────────────────────┘
┌──────┬──────┬──────┬──────────┐
│ Home │Explore│Saved │ Profile │  ← bottom tab bar (iOS/Android pattern)
└──────┴──────┴──────┴──────────┘
```
- Bottom tab bar: max 5 items, 44px minimum touch target each
- Hamburger menus: full-screen overlay slides in from left, closes with × top-right
- Active tab: accent icon + accent label text

---

## 10. Modal & Dialog Placement

### Anatomy

```
┌─────────────────────────────────────────┐
│ bg-overlay (rgba 0,0,0,0.5) — full screen│
│  ┌───────────────────────────────────┐  │
│  │ [Title]                      [×] │  │  ← header: p-6, border-b
│  │ ─────────────────────────────── │  │
│  │ [Content area]                   │  │  ← p-6
│  │                                  │  │
│  │ ─────────────────────────────── │  │
│  │ [Cancel]           [Primary CTA] │  │  ← footer: p-4, border-t, flex justify-end
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Modal sizing

```tsx
// Width variants
sm:   'max-w-sm'   // 384px  — simple confirm dialogs
md:   'max-w-md'   // 448px  — standard forms
lg:   'max-w-lg'   // 512px  — content-heavy forms
xl:   'max-w-xl'   // 576px  — complex forms
2xl:  'max-w-2xl'  // 672px  — large content, multi-column forms
full: 'max-w-full m-4' // near-full screen — editors, media viewers
```

### Rules
- Modal always centered vertically and horizontally (flexbox on overlay)
- Overlay click closes modal (unless destructive action is in progress)
- ESC key always closes modal
- Focus trapped inside modal when open (accessibility)
- Never stack two modals — use a wizard/stepper pattern instead
- Mobile: modals become bottom sheets (slide up from bottom, full width)

---

## 11. Spacing System

All spacing uses the 8px base grid. Every padding, margin, and gap value is a multiple of 4 or 8.

### Spacing token reference

```
4px  → p-1, m-1, gap-1   — icon padding, tight inline
8px  → p-2, m-2, gap-2   — compact element spacing
12px → p-3, m-3, gap-3   — small component internal
16px → p-4, m-4, gap-4   — default component padding
20px → p-5, m-5, gap-5   — card padding default
24px → p-6, m-6, gap-6   — section padding, spacious cards
32px → p-8, m-8, gap-8   — section separation
40px → p-10              — large section padding
48px → p-12              — page section vertical padding
64px → p-16              — hero section padding
96px → p-24              — large marketing section
```

### Contextual spacing rules

| Context | Spacing | Token |
|---|---|---|
| Between icon and label | 8px | `gap-2` |
| Inside a button | 8–12px vertical, 12–24px horizontal | `py-2 px-4` |
| Inside a card | 20–24px | `p-5` or `p-6` |
| Between card sections (divider) | 0 (use border-t) | — |
| Between stacked form fields | 16–24px | `space-y-4` or `space-y-6` |
| Between page sections | 48–96px | `py-12` to `py-24` |
| Between list items | 4–8px | `space-y-1` or `space-y-2` |
| Sidebar padding | 12–16px | `px-3` or `px-4` |
| Page horizontal gutter | 16–32px → max-w container | `px-4 sm:px-6 lg:px-8` |

### Rules
- NEVER use arbitrary spacing values like `mt-[13px]` or `p-[7px]`
- When proximity is wrong, fix the spacing token — don't add dividers as a crutch
- More space between sections than within sections (Gestalt Proximity)
- Consistent internal padding within a component type — all cards same padding

---

## 12. Layout & Grid System

### Page layout structure

```tsx
// Standard page wrapper
<div className="min-h-screen bg-bg-base">
  <Header />  {/* fixed or sticky, z-50 */}
  <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    {children}
  </main>
  <Footer />
</div>

// Dashboard layout (sidebar + content)
<div className="flex min-h-screen bg-bg-base">
  <Sidebar className="w-60 shrink-0 border-r border-default" />
  <main className="flex-1 overflow-auto p-6 lg:p-8">
    {children}
  </main>
</div>
```

### Max-width containers

| Use | Max width | Token |
|---|---|---|
| Narrow / forms / articles | 640px | `max-w-xl` |
| Standard content | 768px | `max-w-3xl` |
| Wide content | 1024px | `max-w-5xl` |
| Dashboard / full | 1280px | `max-w-7xl` |
| Marketing / hero | 1440px | `max-w-screen-2xl` |
| Always: horizontal padding | 16/24/32px | `px-4 sm:px-6 lg:px-8` |

### Column grid

```tsx
// 12-column grid base
<div className="grid grid-cols-12 gap-6">
  <aside className="col-span-12 lg:col-span-3">   {/* sidebar */}
  <main  className="col-span-12 lg:col-span-9">   {/* content */}
</div>

// Common splits
2/3 + 1/3:  col-span-8  + col-span-4
1/2 + 1/2:  col-span-6  + col-span-6
1/4 blocks: col-span-3  (×4)
```

---

## 13. Z-Index System

Z-index without a system causes stacking chaos. Define all levels explicitly.

```ts
// z-index tokens (add to tailwind.config.ts)
zIndex: {
  'base':      '0',     // default document flow
  'raised':    '10',    // cards hover state, sticky elements
  'dropdown':  '100',   // dropdowns, popovers, tooltips
  'sticky':    '200',   // sticky headers, floating buttons
  'overlay':   '300',   // modal backdrop
  'modal':     '400',   // modal content
  'toast':     '500',   // toast notifications (above modals)
  'tooltip':   '600',   // tooltips (always on top)
}
```

| Element | Z-index |
|---|---|
| Page content | 0 |
| Sticky header | 200 |
| Dropdown / popover | 100 |
| Modal backdrop | 300 |
| Modal content | 400 |
| Toast / snackbar | 500 |
| Tooltip | 600 |

### Rules
- NEVER use arbitrary z-index values like `z-[9999]` — add a named token
- NEVER put a dropdown inside a parent with `overflow: hidden` — it will be clipped
- Modal backdrop must be BELOW modal content — always `z-overlay < z-modal`
- Toasts must be ABOVE modals — users need to see feedback even when a modal is open

---

## 14. Component State Colors

Every interactive component needs all states defined before implementation.

```tsx
// Complete state matrix for any interactive element
const states = {
  default:  'bg-bg-surface border-border-default text-primary',
  hover:    'bg-bg-subtle   border-border-strong  text-primary',
  focus:    'ring-2 ring-accent/30 border-border-focus outline-none',
  active:   'bg-bg-muted    border-border-strong  text-primary',
  selected: 'bg-accent-subtle border-accent/40   text-accent-text',
  disabled: 'bg-bg-muted    border-border-default text-disabled opacity-60 cursor-not-allowed',
  error:    'bg-danger-subtle border-border-danger text-primary ring-danger/20',
  success:  'bg-success-subtle border-border-success text-primary',
  loading:  'opacity-70 cursor-wait',
}
```

### Focus ring standard

```tsx
// Use this exact pattern — never remove focus-visible without replacement
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base'
```

---

## 15. Color Anti-Patterns

```
RAINBOW UI
Bad:  Using 6 different accent colors across one page for "variety"
Why:  Color loses meaning — if everything is colorful, nothing is highlighted
Fix:  One accent color, three semantic colors (danger/success/warning), greys for everything else

DARK TEXT ON COLORED BACKGROUND WITHOUT CONTRAST CHECK
Bad:  <div className="bg-warning text-primary">Warning: ...</div>
Why:  #D97706 (amber) background with #09090B text = 5.2:1 (ok), but lighter ambers fail badly
Fix:  Always check contrast. Use -subtle variants (light tinted bg) with dark text instead

COLOR-ONLY STATE SIGNALING
Bad:  Turning a border red to signal error — no icon, no message
Why:  Colorblind users (8% of males) cannot distinguish red from green
Fix:  Red border + error icon + error message text. All three, always.

PURE BLACK TEXT ON WHITE
Bad:  #000000 on #FFFFFF  (21:1 contrast)
Why:  Too harsh — causes halation (white bleeding into dark text perception) on bright screens
Fix:  #09090B or #111111 on white — visually indistinguishable but eliminates harshness

PURE BLACK BACKGROUND
Bad:  #000000 as dark mode base
Why:  Pure black creates excessive contrast and looks low-quality on OLED screens
Fix:  #09090B or #0F172A — near-black with slight warmth or coolness

GRADIENT OVERUSE
Bad:  Gradients on buttons, cards, inputs, backgrounds — everything
Why:  Gradients age quickly and read as decorative rather than structural
Fix:  One subtle gradient maximum — hero section or marketing illustration. UI chrome stays flat.

SEMITRANSPARENT COLORS ON UNKNOWN BACKGROUNDS
Bad:  text-black/70 on a surface that might be colored
Why:  rgba opacity composites with whatever is beneath — unpredictable in dark mode or colored panels
Fix:  Use explicit color tokens — never rely on opacity for color values in components

LOW CONTRAST "MODERN" AESTHETIC
Bad:  text-gray-300 on white (#D1D5DB = 1.6:1) as body text
Why:  Fails WCAG AA. Affects ~10% of users with visual impairment
Fix:  text-secondary (#52525B = 7.4:1) minimum for meaningful text
```

---

## 16. Pre-build Checklist

Run before implementing any new page, section, or component.

### Color system
- [ ] All colors reference tokens — no raw hex values in component files
- [ ] Page uses bg-base → bg-surface → bg-subtle hierarchy correctly
- [ ] Accent color appears in ≤10% of visible screen area
- [ ] All text meets WCAG AA contrast (4.5:1 body, 3:1 large/UI)
- [ ] Semantic colors (danger/success/warning) paired with icon, not color alone
- [ ] Dark mode tested — all tokens have dark variants defined

### Buttons
- [ ] Exactly one primary button per view
- [ ] Destructive action separated from primary action spatially
- [ ] All 5 button states defined: default, hover, focus, disabled, loading
- [ ] Primary button ≥ 44px height on mobile
- [ ] Cancel is left of confirm, never right

### Forms
- [ ] All inputs have visible labels (not placeholder-only)
- [ ] Helper text below label, error message below input
- [ ] All 5 input states defined: default, focus, error, success, disabled
- [ ] Single column layout on mobile
- [ ] Required fields marked in label with *

### Cards & layout
- [ ] No bg-surface card nested inside another bg-surface card
- [ ] Consistent internal padding across all cards of same type
- [ ] Shadow level matches actual Z-axis position of element
- [ ] Interactive cards have hover state defined

### Navigation
- [ ] Logo top-left
- [ ] Auth/CTA top-right
- [ ] Active state visually distinct (not just bold)
- [ ] Mobile navigation defined (hamburger or bottom tabs)

### Spacing
- [ ] All spacing values on 4/8px grid — no arbitrary values
- [ ] Section spacing larger than component spacing
- [ ] Page horizontal gutter: `px-4 sm:px-6 lg:px-8`

### Z-index
- [ ] All z-index values use named tokens
- [ ] Dropdowns not clipped by overflow:hidden parents
- [ ] Toast notifications above modal level

---

*Add new rules to this file as the project evolves. The MCP server reads this at call time — no redeployment needed.*