import { z } from 'zod'
import * as fs from 'fs'
import * as path from 'path'
import { loadContext, type ProjectContext } from '../storage/storage.js'

interface Principle {
  id: string
  title: string
  category: string
  summary: string
  rules: string[]
  dos: string[]
  donts: string[]
  applies_to: string[]
}

function loadAllPrinciples(): Principle[] {
  const categories = ['cognitive', 'visual', 'interaction', 'persuasion', 'aesthetics']
  const contentBase = path.join(__dirname, '..', 'content')
  const all: Principle[] = []

  for (const cat of categories) {
    const file = path.join(contentBase, cat, 'principles.json')
    if (fs.existsSync(file)) {
      const items = JSON.parse(fs.readFileSync(file, 'utf-8')) as Principle[]
      all.push(...items)
    }
  }

  return all
}

const PAGE_TYPE_PRINCIPLES: Record<string, string[]> = {
  dashboard:    ['preattentive_vision', 'visual_hierarchy', 'cognitive_load', 'feedback_latency', 'gestalt_principles'],
  landing_page: ['halo_effect', 'visual_hierarchy', 'anchoring_bias', 'f_pattern', 'preattentive_vision'],
  form:         ['cognitive_load', 'feedback_latency', 'fitts_law', 'affordance', 'gestalt_principles'],
  settings:     ['cognitive_load', 'progressive_disclosure', 'hicks_law', 'affordance', 'visual_hierarchy'],
  onboarding:   ['hicks_law', 'cognitive_load', 'progressive_disclosure', 'halo_effect', 'feedback_latency'],
  pricing:      ['anchoring_bias', 'hicks_law', 'halo_effect', 'visual_hierarchy', 'color_psychology'],
  navigation:   ['hicks_law', 'fitts_law', 'gestalt_principles', 'affordance', 'preattentive_vision'],
}

const LAYOUT_ADVICE: Record<string, Record<string, string>> = {
  dashboard: {
    clarity:    'Single-column or 12-column grid with a persistent left sidebar. Top bar for global actions. Most important metric at top-left. Cards for grouping. Whitespace > borders for separation.',
    conversion: 'Lead with KPIs above the fold. Use bold numbers with trend indicators. Primary action button fixed top-right. Activity feed below the fold.',
    trust:      'Consistent card sizes, 8px grid strictly. Status indicators with icons+color. Last-updated timestamps visible.',
    speed:      'Skeleton screens on load. Lazy-load below-fold sections. Sticky header for navigation. Minimal decorative elements.',
  },
  landing_page: {
    clarity:    'Hero with H1 + single sentence value prop + one CTA. Social proof immediately below. Feature section with 3-column grid. Pricing. FAQ. Footer CTA.',
    conversion: 'Hero CTA above fold. Anchored pricing (show enterprise plan first). Multiple CTAs down the page. Trust badges near CTA.',
    trust:      'Testimonials with photos and company logos. Security badges. Team section. Press mentions.',
    speed:      'Minimal hero — text + background color. No video autoplay. Feature icons over screenshots. Maximum 3 sections.',
  },
  form: {
    clarity:    'Single-column layout. One question visible at a time for complex flows. Labels above fields. Inline validation. Progress bar for multi-step.',
    conversion: 'Reduce fields to minimum viable. Show value at each step. Social login options. Progress indicator.',
    trust:      'Show what data is used for. Privacy note near sensitive fields. No surprises in confirmation state.',
    speed:      'Autofill support. Smart defaults. Keyboard navigation. Submit on Enter.',
  },
  settings: {
    clarity:    'Left sidebar navigation grouped by category. Content area with section headers. Inline save. Search for power users.',
    conversion: 'Focus on clarity and reduced cognitive load.',
    trust:      'Confirm before destructive actions. Show current state clearly.',
    speed:      'Instant save with undo toast. No modal confirmations for non-destructive changes.',
  },
  onboarding: {
    clarity:    'Wizard pattern: one goal per step. Progress bar. Back button always available. Skip option for optional steps.',
    conversion: 'Time-to-value as fast as possible. Defer optional setup. Pre-populate with sensible defaults.',
    trust:      'Explain why you need each piece of information. No surprise charges or commitments.',
    speed:      'Minimum required fields only. Default values everywhere. One-click social login.',
  },
  pricing: {
    clarity:    '3-tier pricing table. Most popular highlighted. Feature comparison table. FAQ section.',
    conversion: 'Anchor with enterprise/high price. Feature the middle tier visually. Annual pricing default.',
    trust:      'Money-back guarantee. No hidden fees statement. Security badges.',
    speed:      'Instant plan activation. No sales call required for self-serve.',
  },
  navigation: {
    clarity:    'Max 7 items. Active state clearly visible. Breadcrumbs for deep hierarchy.',
    conversion: 'Focus on reducing friction and clarity.',
    trust:      'Consistent placement across all pages.',
    speed:      'Keyboard accessible. Predictable hover states.',
  },
}

const TYPOGRAPHY_ADVICE: Record<string, string> = {
  clarity:    'System font stack or Inter. 16-18px body. 1.6 line-height. 60-75ch max-width. Strong H1/H2/H3 hierarchy with at least 1.5x size ratio.',
  conversion: 'Bold headline (28-48px). Short sentences. Action-oriented copy. CTA button text: verb + value ("Start free trial").',
  trust:      'Serif or semi-serif for credibility. Generous line-height. No all-caps body text.',
  speed:      'System font stack (no web font load). Minimal font weights (regular + bold only).',
}

const COLOR_ADVICE: Record<string, string> = {
  clarity:    'High contrast neutral palette. Single accent color for interactive elements. Semantic red/green/yellow for status.',
  conversion: 'Brand primary for CTAs. High-contrast button (minimum 4.5:1). Warm accent for urgency signals.',
  trust:      'Blue primary (signals reliability). Deep navy or charcoal text. Minimal color usage — restraint signals confidence.',
  speed:      'Dark mode or minimal palette. Monochrome with a single action color.',
}

export const designPageShape = {
  page_type: z.enum(['dashboard', 'landing_page', 'form', 'settings', 'onboarding', 'pricing', 'navigation']),
  audience:  z.string().describe('Who will use this page'),
  emphasis:  z.enum(['clarity', 'conversion', 'trust', 'speed']),
  context:   z.string().optional().describe('Additional context about the product'),
}

export type DesignPageInput = {
  page_type: keyof typeof PAGE_TYPE_PRINCIPLES
  audience:  string
  emphasis:  'clarity' | 'conversion' | 'trust' | 'speed'
  context?:  string
}

export function designPage(input: DesignPageInput): string {
  const { page_type, audience, emphasis, context } = input
  const principles = loadAllPrinciples()
  const projectCtx: ProjectContext = loadContext()

  const relevantIds = PAGE_TYPE_PRINCIPLES[page_type] ?? PAGE_TYPE_PRINCIPLES['dashboard']
  const topPrinciples = relevantIds.slice(0, 3)
    .map(id => principles.find(p => p.id === id))
    .filter(Boolean) as Principle[]

  const layoutAdvice   = LAYOUT_ADVICE[page_type]?.[emphasis]   ?? ''
  const typoAdvice     = TYPOGRAPHY_ADVICE[emphasis]             ?? ''
  const colorAdvice    = COLOR_ADVICE[emphasis]                  ?? ''

  const principleSection = topPrinciples.map(p => {
    const rules  = p.rules.slice(0, 2).map(r => `  - ${r}`).join('\n')
    const doItem = p.dos[0]   ? `  - Do: ${p.dos[0]}`    : ''
    const dontItem = p.donts[0] ? `  - Avoid: ${p.donts[0]}` : ''
    return `### ${p.title}\n${p.summary}\n\n**Key rules:**\n${rules}\n${doItem}\n${dontItem}`
  }).join('\n\n')

  const mistakes = topPrinciples
    .flatMap(p => p.donts.slice(0, 1))
    .map(d => `- ${d}`)
    .join('\n')

  const brandSection = projectCtx.brand.primary_color
    ? `\n## Brand Context\nPrimary color: ${projectCtx.brand.primary_color} | Theme: ${projectCtx.brand.theme} | Font: ${projectCtx.brand.font || 'not set'}`
    : ''

  const customRulesSection = projectCtx.custom_rules.length > 0
    ? `\n## Project Custom Rules\n${projectCtx.custom_rules.map(r => `- ${r}`).join('\n')}`
    : ''

  return `# UI Design Strategy: ${page_type.replace('_', ' ')} for ${audience}
**Emphasis:** ${emphasis} | **Page type:** ${page_type}${context ? `\n**Context:** ${context}` : ''}${brandSection}${customRulesSection}

---

## Layout Recommendation
${layoutAdvice}

## Typography
${typoAdvice}

## Color Strategy
${colorAdvice}

---

## Psychology Principles to Apply (Top 3)

${principleSection}

---

## Common Mistakes to Avoid
${mistakes}

---

## Quick Checklist
- [ ] Does the primary CTA stand out at a glance (squint test)?
- [ ] Is cognitive load minimized — fewer than 7 nav items, progressive disclosure for complexity?
- [ ] Do all interactive elements have clear signifiers?
- [ ] Is text contrast WCAG AA compliant (4.5:1 minimum)?
- [ ] Is feedback latency addressed — loading states for every async action?
`
}
