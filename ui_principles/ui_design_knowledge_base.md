# UI Design Knowledge Base

Version: 2026-05-07

This document consolidates the requested sources into one practical reference:

- Parallel HQ: 8 principles of design
- Oklahoma State University: principles of design and visual weight
- Medium article on UI/UX laws with AJIO examples
- Michael J. Madison, Law as Design: Objects, Concepts, and Digital Things

It is not only theory. Each section includes practical UI guidance, examples, and implementation defaults for product teams.

---

## 1. What the sources agree on

Across the sources, good design is not decoration. It is a system for:

- directing attention
- reducing confusion
- creating trust
- shaping behavior through structure
- making interfaces feel natural, not effortful

Three ideas recur across the material:

1. Design principles work through visual weight.
OSU emphasizes that bigger, darker, more saturated, and higher-contrast elements feel heavier and attract more attention.

2. UI laws are applied psychology.
The Medium piece frames UI/UX laws as practical psychology: they predict how people scan, choose, tap, remember, and trust.

3. Digital products are not neutral containers.
The PDF adds an important framing layer: digital artifacts encode rules. A disabled button, one-click flow, default pricing tier, locked ecosystem, or forced path is not just presentation. It is behavior designed into the object.

In product terms: layout, type, color, placement, defaults, and interaction rules are part of the product logic itself.

---

## 2. Design elements vs design principles vs UI laws

### Elements

Elements are the raw ingredients:

- line
- shape
- color
- type
- texture
- space
- value

### Principles

Principles explain how those ingredients should work together:

- balance
- contrast
- emphasis
- movement
- pattern
- repetition
- proportion
- unity
- hierarchy
- variety
- placement
- white space

### UI laws

UI laws explain why people respond the way they do:

- Fitts's Law
- Hick's Law
- Cognitive Load and Miller's Law
- Jakob's Law
- Tesler's Law
- Doherty Threshold
- Von Restorff Effect
- Peak-End Rule
- Zeigarnik Effect

Use all three layers together:

- elements build the interface
- principles organize the interface
- laws predict how users behave in the interface

---

## 3. A practical baseline for modern UI work

These defaults are not universal truth, but they are strong starting points for most product teams.

### Layout defaults

| Surface | Recommended layout |
|---|---|
| Marketing landing page | 12-column desktop grid, 4-column tablet, 1-column mobile |
| SaaS dashboard | 12-column desktop grid, fixed sidebar when navigation depth is high |
| Form | Single-column for most flows; two columns only when the fields are short and clearly related |
| Pricing page | 3-card comparison on desktop, stacked cards on mobile |
| Content page | 60 to 75 characters line length for body copy |

### Spacing defaults

Use a consistent spacing scale.

| Token | px |
|---|---|
| xs | 4 |
| sm | 8 |
| md | 12 |
| lg | 16 |
| xl | 24 |
| 2xl | 32 |
| 3xl | 48 |
| 4xl | 64 |

Rules:

- Keep internal spacing tighter than external spacing.
- Keep card padding at 16 to 24 px on desktop and 16 to 20 px on mobile.
- Use 24 to 40 px between major sections on mobile and 48 to 96 px on desktop.

### Button defaults

| Use case | Minimum target | Preferred height |
|---|---|
| Mobile primary action | 44 x 44 px | 48 to 56 px |
| Desktop primary action | 40 x 40 px | 44 to 48 px |
| Destructive action | Same size as primary, but visually lower priority until confirmation |

### Form defaults

- Put labels above fields for scanning speed.
- Do not use placeholders as the only label.
- Validate inline for format and after blur for correctness.
- Keep field widths meaningful: email full width, city narrower, postal code narrower.

### Typography defaults

#### Font family by use case

| Use case | Good choices | Why |
|---|---|---|
| Enterprise SaaS, dashboard, admin | Inter, IBM Plex Sans, Source Sans 3, Geist | Dense, clear, neutral, readable at smaller sizes |
| Consumer app | Inter, DM Sans, Manrope, SF Pro, Plus Jakarta Sans | Friendly, versatile, readable |
| Premium editorial or luxury brand | Instrument Serif, Fraunces, Canela-style serif with a stable sans pairing | Adds authority, taste, and emotion |
| Technical or developer tooling | IBM Plex Sans, Geist, Inter, JetBrains Sans | Precise, low-friction, high legibility |
| Youthful brand, fashion, music | Sora, Space Grotesk, General Sans, Clash Display for headlines with a calmer sans for body | Energy and edge without sacrificing readability |

#### Font size baseline

| Text role | Desktop | Mobile |
|---|---|---|
| Hero headline | 48 to 72 px | 32 to 44 px |
| Section headline | 28 to 40 px | 24 to 32 px |
| Card title | 20 to 24 px | 18 to 22 px |
| Body | 16 to 18 px | 16 to 18 px |
| Small support text | 14 px | 14 px |
| Micro label | 12 to 13 px | 12 to 13 px |

#### Line-height baseline

| Text role | Line-height |
|---|---|
| Hero | 1.0 to 1.15 |
| Heading | 1.1 to 1.25 |
| Body | 1.45 to 1.7 |
| Labels | 1.2 to 1.4 |

#### Headline placement defaults

- Put the main headline in the top-left area or first scan path.
- On marketing pages, keep the headline, value proposition, and primary CTA within the first screen when possible.
- On dashboards, place the page title and primary summary KPI above secondary controls.
- On forms, keep the headline short and task-based, such as "Create account" or "Set up your workspace".

---

## 4. Principle cards

Each card follows the same structure:

- what it is
- why it works
- how to use it
- implementation guidance
- examples
- failure mode

### 4.1 Balance

#### What it is

Balance is the distribution of visual weight across a composition. It can be symmetrical for calm and stability, or asymmetrical for energy with control.

#### Why it works

People look for equilibrium. OSU notes that the eye seeks balance horizontally and vertically. Parallel connects balance to trust because an unbalanced page creates tension.

#### How to use it

- Use symmetrical balance for finance, healthcare, settings, and admin surfaces.
- Use asymmetrical balance for landing pages, editorial pages, and creative brand work.
- Balance density, not only geometry. A saturated red card can outweigh a larger gray panel.

#### Implementation guidance

- One heavy focal area per viewport is usually enough.
- If the left side has dense text, counterweight with image mass, a stronger CTA block, or more spacing on the right.
- On dashboards, avoid stacking every KPI and alert into the top-left corner.

#### Example

- Apple product pages often use asymmetrical balance: a large product visual sits opposite short, controlled copy and a clear call to action.
- McDonald's golden arches are a classic example of symmetrical balance from OSU.

#### Failure mode

- Too much dense content in one quadrant makes the UI feel unstable.
- Empty dead zones combined with overloaded corners make a product look unfinished.

### 4.2 Contrast

#### What it is

Contrast is difference: light versus dark, large versus small, thick versus thin, loud versus quiet.

#### Why it works

Contrast creates distinction. It improves readability, hierarchy, and focus.

#### How to use it

- Build contrast with color, size, weight, spacing, and shape.
- Reserve your strongest contrast for the most important action or message.
- Use low contrast for supportive text, never for critical text.

#### Implementation guidance

- Body text should generally meet at least 4.5:1 contrast.
- Large headings can go lower only if still clearly readable, but for production work AA compliance is the safer floor.
- Primary and secondary buttons should not rely only on label wording to differentiate intent.

#### Example

- Nike often uses bold black-and-white contrast with a single urgent accent, letting product photography and headline copy dominate instantly.
- Spotify uses high-contrast surfaces with vivid green reserved for action and brand recall.

#### Failure mode

- Using many high-contrast colors at once destroys hierarchy.
- Low contrast labels on tinted cards are a common reason dashboards feel polished but unreadable.

### 4.3 Emphasis and hierarchy

#### What it is

Emphasis identifies the focal point. Hierarchy ranks everything else beneath it.

#### Why it works

Users need to know where to start. If everything shouts, the interface becomes silent.

#### How to use it

- Decide the first thing the user should notice in under 2 seconds.
- Support it with second-level context and only then tertiary details.
- Keep hierarchy to three clear levels on a single screen whenever possible.

#### Implementation guidance

- Use a size jump of at least 1.3x to 1.5x between hierarchy levels.
- Give the primary action the strongest contrast, strongest label, and clearest position.
- On dense screens, emphasis can come from whitespace as much as from color.

#### Example

- Stripe's product pages often emphasize one sentence, one code or product visual, and one CTA, then move into proof and detail.
- On Meta surfaces like Facebook or Instagram, emphasis is often placed on content creation and feed engagement controls while secondary settings stay visually quiet.

#### Failure mode

- Multiple primary CTAs create indecision.
- Making every number, card title, and badge bold removes rank.

### 4.4 Placement and proximity

#### What it is

Placement is where things live. Proximity determines what the brain groups together.

#### Why it works

The eye assumes nearby items are related. This is one of the most important practical expressions of Gestalt grouping.

#### How to use it

- Place actions near the object they control.
- Put labels, helper text, and validation near the field they describe.
- Group related content before adding visual dividers.

#### Implementation guidance

- Primary actions belong at the end of the reading path or directly adjacent to the object they affect.
- Top-left and center-left remain high-value areas for scanning.
- For pricing and comparison tables, keep plan name, price, main benefit, and CTA tightly grouped.

#### Example

- Amazon places product title, rating, price, delivery promise, and purchase action within one tight decision cluster.
- AJIO's use of icon plus label increases target area and reduces ambiguity in navigation.

#### Failure mode

- Global actions too far from the objects they affect increase friction.
- Wide gaps between label and field create comprehension lag.

### 4.5 Alignment

#### What it is

Alignment creates invisible structure. It is one of the fastest ways to make an interface feel intentional.

#### Why it works

Aligned elements reduce visual noise and support scanning.

#### How to use it

- Align text to a consistent edge.
- Use shared baselines and card widths.
- Keep input fields, labels, and controls lined up within a form.

#### Implementation guidance

- Prefer left-aligned body text for interfaces using Latin scripts.
- Use one dominant column edge per section.
- Avoid floating objects that ignore grid logic unless that break is deliberate and rare.

#### Example

- Linear's interface feels premium partly because alignment is extremely strict across type, panels, list items, and controls.

#### Failure mode

- Near-alignment is worse than obvious misalignment because it looks accidental.

### 4.6 Movement and rhythm

#### What it is

Movement is how the eye travels. Rhythm is the repeated interval that makes that movement feel predictable.

#### Why it works

People read interfaces in sequences, not as flat snapshots. Movement helps the brain know what comes next.

#### How to use it

- Build flows from headline to explanation to proof to action.
- Use repeated card heights, margins, and content blocks to create scroll rhythm.
- Use animation to confirm action, not to perform theater.

#### Implementation guidance

- Keep entrance animations short, usually 150 to 300 ms.
- Use stagger only when it supports comprehension.
- For onboarding, number steps or use a visible progress system.

#### Example

- Apple's launch pages use controlled scroll choreography to move the eye through narrative beats.
- Notion uses spatial progression and progressive disclosure to let users discover features without overwhelming the first screen.

#### Failure mode

- Large animated backgrounds, autoplay motion, or attention-grabbing loaders can overwhelm the core task.

### 4.7 Pattern

#### What it is

Pattern is repeated structure with similarity in spacing, structure, or motif.

#### Why it works

Pattern lowers interpretation cost. The user stops re-learning the interface.

#### How to use it

- Keep cards, list rows, nav sections, and tables structurally consistent.
- Use pattern for predictability, not ornament by default.

#### Implementation guidance

- Define reusable components, not just reusable colors.
- Audit whether a component still works at mobile and dense desktop states.

#### Example

- Airbnb's search results use repeating card patterns that help the brain compare listings quickly.

#### Failure mode

- Decorative patterns behind text often reduce readability and feel dated.

### 4.8 Repetition

#### What it is

Repetition is deliberate reuse of visual and interaction decisions.

#### Why it works

Consistency reduces cognitive load and increases trust.

#### How to use it

- Repeat type scale, icon style, radius, elevation logic, and spacing rules.
- Repeat interaction patterns like hover, press, focus, success, and error states.

#### Implementation guidance

- If two buttons perform equivalent roles, they should look equivalent.
- If one component breaks the pattern, document the reason.

#### Example

- Meta products use repetition heavily: familiar icon treatments, chip styles, avatars, reaction controls, and modal patterns make large systems learnable.

#### Failure mode

- Blind repetition without context makes products feel generic and monotonous.

### 4.9 Proportion and scale

#### What it is

Proportion is the relationship of one size to another. Scale is how large something feels in context.

#### Why it works

Scale signals importance before language does.

#### How to use it

- Make the most important object obviously larger.
- Use modular type and spacing scales.
- Adjust scale by device, not by percentage alone.

#### Implementation guidance

- A dashboard KPI should generally be larger than surrounding labels by at least one clear step.
- Hero headlines can be oversized, but supporting text should still remain readable and not look miniature beside them.

#### Example

- Nike uses oversized typography and dominant photography to create energy and urgency.
- Bloomberg and financial tools use controlled scale to highlight key numbers without turning the whole screen into noise.

#### Failure mode

- Huge logos, oversized icons, or tiny body copy create amateur proportion immediately.

### 4.10 Unity

#### What it is

Unity is the sense that the whole interface belongs to one system.

#### Why it works

Unity creates trust. Disconnected styles look improvised and unreliable.

#### How to use it

- Standardize palette, component logic, type pairings, radius, spacing, and interaction tone.
- Let one design language run across marketing, app, support, and settings.

#### Implementation guidance

- Use design tokens for color, type, spacing, and motion.
- Keep illustration style, icon stroke, and border logic coherent.

#### Example

- Apple's unity comes from consistent materials, type, spacing, and motion language across product, marketing, and operating system surfaces.

#### Failure mode

- Mixing three button styles, two card philosophies, and unrelated type systems kills credibility.

### 4.11 Variety

#### What it is

Variety introduces controlled difference so the interface does not become flat or boring.

#### Why it works

Unity without variety becomes sterile. Variety without unity becomes chaos.

#### How to use it

- Vary scale, imagery, section backgrounds, or component arrangement while keeping the underlying system consistent.

#### Implementation guidance

- Use variety at the section level more often than at the component level.
- Let one accent, one hero visual, or one alternate card treatment provide lift.

#### Example

- Spotify uses variety in album art, gradients, and playlist imagery while the system beneath remains highly repetitive.

#### Failure mode

- Too much novelty in every section makes the brand feel unstable.

### 4.12 White space

#### What it is

White space is the deliberate absence of clutter.

#### Why it works

White space creates focus, separation, elegance, and breathing room.

#### How to use it

- Use it to define groups before adding borders.
- Increase space around primary actions and major sections.
- Use dense spacing only when the audience benefits from density and already understands the system.

#### Implementation guidance

- Premium and trust-heavy brands often benefit from more white space.
- Internal tools can be denser, but should still preserve clear grouping.

#### Example

- Apple and luxury commerce brands often use white space to signal confidence and premium value.

#### Failure mode

- Too little space feels noisy. Too much space without hierarchy feels empty.

### 4.13 Affordance and signifiers

#### What it is

Affordance is what an object allows. A signifier is the cue that tells the user what to do.

#### Why it works

Users should not have to guess what is clickable, draggable, editable, or dangerous.

#### How to use it

- Buttons should look pressable.
- Links should read as links.
- Inputs need clear boundaries.
- Destructive actions need warning cues.

#### Implementation guidance

- Use states: default, hover, focus, active, disabled, loading.
- Do not strip all borders and shadows from controls unless another signifier is stronger.

#### Example

- AJIO's icon plus label pattern improves signification because the larger combined target communicates both meaning and tappability.

#### Failure mode

- Flat text that acts like a button but looks like a label is a classic false affordance.

### 4.14 Feedback and response

#### What it is

Every user action should create a visible system reaction.

#### Why it works

People interpret silence as failure.

#### How to use it

- Show press state immediately.
- Show progress if the action takes longer than a moment.
- Confirm success or explain failure in context.

#### Implementation guidance

- Use inline status for forms.
- Use skeletons more often than spinners for content loading.
- Provide undo for reversible destructive actions.

#### Example

- Slack, Linear, and Notion all use small, fast feedback loops that keep users oriented without interrupting flow.

#### Failure mode

- Loading without visible progress encourages double taps and distrust.

---

## 5. Core UI laws and how to use them

### 5.1 Fitts's Law

Time to hit a target depends on its size and distance.

Practical rules:

- Make primary mobile actions at least 44 to 48 px tall.
- Put the main action near the content it acts on.
- Do not place destructive actions immediately beside a dominant primary action.

Example:

- AJIO's icon plus text label creates a larger tap target than icon alone.
- Bottom navigation in mobile apps works because targets are large and consistently reachable.

### 5.2 Hick's Law

More choices increase decision time.

Practical rules:

- Keep top-level navigation tight.
- Offer a recommended plan or default path.
- Hide advanced options until they matter.

Example:

- Good pricing pages frame three plans well. Bad ones dump ten tiers and force analysis paralysis.

### 5.3 Cognitive Load and Miller's Law

Working memory is limited. Chunking reduces overload.

Practical rules:

- Keep one major task per screen.
- Break complex flows into steps.
- Use labels people already understand.

Example:

- Google account setup and Stripe onboarding succeed because they ask for only what is needed now.

### 5.4 Jakob's Law

Users expect your product to work like the products they already know.

Practical rules:

- Do not reinvent common navigation, search, dropdown, and settings patterns without a strong reason.
- Innovate in value, not in basic comprehension.

Example:

- Meta, Gmail, Slack, and Notion each have different brands, but their core list, compose, search, and account patterns remain recognizable.

### 5.5 Tesler's Law

Every system has irreducible complexity. You can only move it around.

Practical rules:

- Put complexity where the user is most prepared to handle it.
- Use defaults, templates, and smart automation to absorb the rest.

Example:

- Shopify hides logistics complexity behind setup defaults, guided flows, and prebuilt templates.

### 5.6 Doherty Threshold

Systems feel fluent when they respond quickly enough to preserve thought continuity.

Practical rules:

- Acknowledge actions immediately.
- Use optimistic updates when safe.
- Show status for background work.

Example:

- Messaging apps feel good because send, delivered, and typing states appear quickly.

### 5.7 Von Restorff Effect

The outlier gets remembered.

Practical rules:

- Use one accent color for the primary CTA.
- Use contrast or unusual treatment sparingly and intentionally.

Example:

- A pricing table with one clearly recommended plan almost always outperforms a wall of identical options.

### 5.8 Peak-End Rule

People remember the emotional peak and the ending most strongly.

Practical rules:

- Make the first value moment clear.
- Make completion, success, and confirmation screens excellent.

Example:

- Airbnb and Duolingo invest in polished completion states because the ending affects the memory of the whole task.

### 5.9 Zeigarnik Effect

Unfinished tasks stay mentally active.

Practical rules:

- Use progress bars, completion checklists, and saved drafts.
- Show what is left, not just what is done.

Example:

- LinkedIn profile completion and onboarding checklists use this principle directly.

---

## 6. Emotion in product design

Emotion is not just color mood. It is created by the interaction of pace, confidence, clarity, aspiration, and perceived control.

### How companies use emotion well

#### Nike

- Uses oversized athletic photography, bold type, short imperative copy, and strong contrast.
- Emotional effect: urgency, confidence, motion, personal ambition.
- Design lesson: if the product promise is energy or transformation, scale and contrast should lead.

#### Apple

- Uses white space, precise product framing, restrained color, and controlled motion.
- Emotional effect: calm confidence, quality, precision, premium trust.
- Design lesson: if the product promise is quality or craftsmanship, remove clutter and let material and spacing do the persuasion.

#### Meta

- Uses familiar blue-white foundations, repetitive interaction patterns, rounded surfaces, and constant engagement cues.
- Emotional effect: familiarity, continuity, low learning cost, social immediacy.
- Design lesson: very large ecosystems need repeated signals and familiar patterns more than novelty.

#### Spotify

- Uses dark surfaces, vibrant accents, bold cover art, and strong visual rhythm.
- Emotional effect: energy, immersion, identity, personal taste.
- Design lesson: when content is expressive, the chrome should support mood without fighting the content.

#### Airbnb

- Uses warm photography, soft curves, human-centered copy, and high trust spacing.
- Emotional effect: belonging, safety, approachability.
- Design lesson: hospitality products should reduce risk and increase warmth at the same time.

#### Stripe

- Uses code-forward visuals, strong hierarchy, disciplined spacing, and confident minimalism.
- Emotional effect: competence, modernity, technical trust.
- Design lesson: technical products win when clarity and polish coexist.

---

## 7. Use-case recipes

### 7.1 Landing page

Goal: clarity plus persuasion.

Use:

- Hero headline at 48 to 72 px desktop, 32 to 44 px mobile
- One primary CTA above the fold
- Social proof directly under hero
- Repeated proof-value-action rhythm down the page

Good placement:

- Headline left or center, but keep CTA close
- Product image or illustration should support, not compete

Recommended type pairings:

- Manrope + Inter
- Sora + DM Sans
- Fraunces + Inter for premium positioning

### 7.2 Dashboard

Goal: comprehension and action speed.

Use:

- 12-column grid
- Top-left KPI or alert as dominant visual anchor
- 20 to 24 px page title
- 28 to 40 px main number depending on density

Good placement:

- Filters close to the data they modify
- Primary action top-right or inline with active work area
- Keep passive analytics below the first decision layer

Recommended type pairings:

- Inter
- IBM Plex Sans
- Geist

### 7.3 Onboarding

Goal: reduce uncertainty and accelerate first value.

Use:

- One goal per screen
- Progress indicator
- Default answers where safe
- Inline reassurance about why information is being requested

Headline guidance:

- Keep under 8 words
- Focus on the next value step, not brand poetry

### 7.4 Form

Goal: completion with low error rate.

Use:

- Single-column layout for most forms
- Labels above fields
- 16 px body text minimum
- 48 to 56 px input height where touch is primary

Good placement:

- Error text directly under the affected field
- Submit action at the end of the form or sticky on mobile if long

### 7.5 Pricing page

Goal: reduce comparison friction and guide decision.

Use:

- 3 or 4 plans maximum in primary comparison
- Recommended plan visually distinct
- Annual billing default when aligned to business goals
- Comparison table below summary cards

Type guidance:

- Price number large and bold
- Benefit headline above feature list
- CTA directly beneath price and top value claim

---

## 8. Design as rule-making

This is the main contribution from the PDF.

Digital products do not only display information. They embed permission, restriction, sequence, and power into the object itself.

### What this means in UI practice

- A default plan selection is a behavioral nudge.
- A disabled export button is a policy encoded as interface.
- A required upgrade modal is business logic expressed as design.
- A repair-hostile ecosystem is a rule hidden in product architecture.

### Practical takeaway

When designing interfaces, ask two questions:

1. What are we helping the user do?
2. What are we silently forcing, preventing, or biasing?

This matters because good UX can still be manipulative if the artifact encodes unfair constraints.

### Good use of designed constraints

- Disabling submit until required fields are valid
- Warning before destructive actions
- Rate limits that protect system stability
- Permissions that protect privacy and safety

### Bad use of designed constraints

- Obscuring cancellation
- Hiding export behind confusing flows
- Dark pattern countdown timers
- Making comparison impossible to push the default option

Design is never only visual. It is operational, ethical, and behavioral.

---

## 9. Review checklist for teams

Use this during design critiques, PRD reviews, and UI refactors.

### Attention and hierarchy

- Is there one obvious focal point?
- Is the headline or primary KPI visibly dominant?
- Does the CTA stand out without screaming?

### Readability and contrast

- Is all critical text readable at production contrast levels?
- Are supporting and primary text clearly differentiated?
- Are there too many high-contrast competitors on one screen?

### Structure and grouping

- Are related items grouped tightly enough?
- Are actions positioned near the objects they affect?
- Is the alignment clean enough to feel intentional?

### Interaction and psychology

- Are choice counts low enough for fast decisions?
- Are touch targets large enough?
- Does the system give immediate feedback?
- Are defaults helping the user or only helping the business?

### Brand and emotion

- Does the interface emotion match the product promise?
- Do typography, color, spacing, and imagery tell the same story?
- Is there enough unity to feel trustworthy and enough variety to feel alive?

### Ethics and accessibility

- Would this flow still feel fair if the user were in a hurry or under stress?
- Are we using design to clarify or to trap?
- Does the interface work with keyboard, screen reader, and reduced motion needs?

---

## 10. Suggested next use inside your MCP

This knowledge base can feed three MCP behaviors:

1. Design generation
Return principle-aware page strategies with type, spacing, placement, and emotional direction.

2. Existing UI critique
Score screens for hierarchy, contrast, grouping, density, affordance, and ethical constraints.

3. Refactor guidance
Turn vague requests like "make it better" into concrete moves such as:
- reduce top-level choices from 9 to 5
- increase body contrast from muted gray to accessible neutral
- move CTA into first scan path
- split one overloaded settings screen into basic and advanced sections

---

## 11. Source notes

### Parallel HQ

Primary contribution:

- a clean 8-principle framework for product critique
- emphasis on trust, clutter reduction, and review language

### Oklahoma State University

Primary contribution:

- visual weight as the mechanism beneath the principles
- strong explanations of contrast, balance, proportion, pattern, rhythm, unity, and variety
- accessible examples from logos, posters, and art

### Medium article with AJIO examples

Primary contribution:

- UI laws as psychology in action
- emphasis on consistency, simplicity, and time-saving navigation
- explicit example that icon plus label increases target size and clarity

Note:
The mirrored article exposed only part of the article text, but its core framing and AJIO takeaways were still recoverable.

### Law as Design: Objects, Concepts, and Digital Things

Primary contribution:

- digital objects encode rules and constraints
- designed artifacts shape behavior, access, repair, reuse, and control
- the boundary between interface, object, and policy is often artificial

This is especially useful for evaluating manipulative flows, ecosystem lock-in, permissions, and product constraints.

---

## 12. Final takeaway

The strongest UI teams do not separate beauty, usability, and behavior.

They treat design as a system that manages:

- attention
- understanding
- trust
- action
- memory
- power

If a screen looks good but the user cannot tell what matters, it has failed.
If a flow converts well by hiding alternatives, it may be effective but not good.
If a product is consistent, legible, emotionally aligned, and honest about its constraints, it will feel better because it is better.