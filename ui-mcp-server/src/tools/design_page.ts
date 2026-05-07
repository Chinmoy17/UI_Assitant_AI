import { z } from 'zod'
import * as fs from 'fs'
import * as path from 'path'
import { loadContext, type ProjectContext } from '../storage/storage.js'

// ─── KB types ────────────────────────────────────────────────────────────────

interface KBVisualPrinciple {
  id: string
  title: string
  summary: string
  how: string[]
  implementation: string[]
  examples: string[]
  failure_mode: string
  best_page_types: string[]
  best_emphasis: string[]
}

interface KBBrandExample {
  brand: string
  industry_match: string[]
  emphasis_match: string[]
  design_signals: string[]
  emotional_effect: string
  design_lesson: string
  type_direction: string
  color_direction: string
}

interface KBFontFamily {
  use_case: string
  fonts: string[]
  reason: string
  industry_match: string[]
  emphasis_match: string[]
}

interface KBTypographySpec {
  font_families: KBFontFamily[]
  size_scale: Array<{ role: string; desktop: string; mobile: string }>
  line_height_scale: Array<{ role: string; value: string }>
  spacing_scale: Array<{ token: string; px: number }>
  button_targets: Array<{ use_case: string; minimum: string; preferred: string }>
  page_type_font_pairings: Record<string, { pairings: string[]; headline_guidance: string }>
  line_length_guidance: Record<string, string>
}

// ─── KB loaders ──────────────────────────────────────────────────────────────

const KB_BASE = path.join(__dirname, '..', 'content', 'kb')

function loadKBVisualPrinciples(): KBVisualPrinciple[] {
  const file = path.join(KB_BASE, 'visual_principles.json')
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as KBVisualPrinciple[]
}

function loadKBBrandExamples(): KBBrandExample[] {
  const file = path.join(KB_BASE, 'brand_examples.json')
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as KBBrandExample[]
}

function loadKBTypographySpec(): KBTypographySpec | null {
  const file = path.join(KB_BASE, 'typography_spec.json')
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as KBTypographySpec
}

// ─── KB selection helpers ────────────────────────────────────────────────────

function selectKBPrinciples(
  pageType: string,
  emphasis: string,
  allPrinciples: KBVisualPrinciple[],
  count: number
): KBVisualPrinciple[] {
  const scored = allPrinciples.map(p => {
    let score = 0
    if (p.best_page_types.includes(pageType)) score += 3
    if (p.best_emphasis.includes(emphasis)) score += 2
    return { p, score }
  })
  scored.sort((a, b) => b.score - a.score || a.p.id.localeCompare(b.p.id))
  return scored.slice(0, count).map(s => s.p)
}

function findBrandMatch(
  industry: string,
  emphasis: string,
  examples: KBBrandExample[]
): KBBrandExample | null {
  if (!industry) return null
  const normalized = industry.toLowerCase()
  for (const ex of examples) {
    const industryHit = ex.industry_match.some(term => normalized.includes(term))
    const emphasisHit = ex.emphasis_match.includes(emphasis)
    if (industryHit && emphasisHit) return ex
    if (industryHit) return ex
  }
  return null
}

function getTypographyFonts(
  pageType: string,
  industry: string,
  emphasis: string,
  spec: KBTypographySpec | null
): { fontFamily: string; pairings: string; headlineGuidance: string; sizeNotes: string } {
  const fallback = { fontFamily: 'Inter', pairings: '', headlineGuidance: '', sizeNotes: '' }
  if (!spec) return fallback

  // Font family recommendation
  const normalizedIndustry = (industry || '').toLowerCase()
  const normalizedEmphasis = emphasis.toLowerCase()
  let bestFamily = spec.font_families.find(
    ff => ff.industry_match.some(t => normalizedIndustry.includes(t)) && ff.emphasis_match.includes(normalizedEmphasis)
  ) ?? spec.font_families.find(
    ff => ff.industry_match.some(t => normalizedIndustry.includes(t))
  ) ?? spec.font_families[0]

  const pairingInfo = spec.page_type_font_pairings[pageType]
  const sizeRow = spec.size_scale.find(s => s.role === 'Body')
  const sizeNotes = sizeRow ? `Body: ${sizeRow.desktop} desktop / ${sizeRow.mobile} mobile` : ''

  return {
    fontFamily: bestFamily.fonts.slice(0, 3).join(', '),
    pairings: pairingInfo?.pairings.join(' — ') ?? '',
    headlineGuidance: pairingInfo?.headline_guidance ?? '',
    sizeNotes,
  }
}

// ─── Existing principle types ─────────────────────────────────────────────────

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

interface PrincipleMatch {
  principle: Principle
  score: number
  reasons: string[]
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

const EMPHASIS_CATEGORY_BONUS: Record<DesignPageInput['emphasis'], Record<string, number>> = {
  clarity: {
    cognitive: 3,
    visual: 2,
    interaction: 2,
    persuasion: 0,
    aesthetics: 1,
  },
  conversion: {
    cognitive: 1,
    visual: 2,
    interaction: 2,
    persuasion: 3,
    aesthetics: 2,
  },
  trust: {
    cognitive: 2,
    visual: 2,
    interaction: 2,
    persuasion: 2,
    aesthetics: 3,
  },
  speed: {
    cognitive: 3,
    visual: 1,
    interaction: 3,
    persuasion: 0,
    aesthetics: 1,
  },
}

const EMPHASIS_PRINCIPLE_BONUS: Record<DesignPageInput['emphasis'], Record<string, number>> = {
  clarity: {
    visual_hierarchy: 3,
    cognitive_load: 3,
    progressive_disclosure: 2,
    affordance: 1,
  },
  conversion: {
    anchoring_bias: 3,
    halo_effect: 3,
    visual_hierarchy: 2,
    f_pattern: 2,
    color_psychology: 2,
  },
  trust: {
    halo_effect: 3,
    feedback_latency: 2,
    affordance: 2,
    visual_hierarchy: 2,
  },
  speed: {
    feedback_latency: 3,
    fitts_law: 2,
    cognitive_load: 2,
    hicks_law: 2,
  },
}

const DEVICE_ADVICE: Record<string, string> = {
  mobile: 'Bias toward one-column layouts, sticky bottom actions, 44-48px touch targets, and ruthless content trimming. Any secondary action should collapse behind a progressive disclosure pattern.',
  desktop: 'Use the extra width for comparison, not decoration. Keep a dominant focal area, preserve keyboard flows, and avoid spreading primary decisions across distant zones.',
  tablet: 'Design for split attention: wider cards than mobile, fewer concurrent panels than desktop. Large touch targets still matter.',
}

const INDUSTRY_ADVICE: Array<{ terms: string[]; advice: string }> = [
  {
    terms: ['fintech', 'finance', 'bank', 'insurance', 'health', 'healthcare', 'medical', 'legal', 'security', 'government'],
    advice: 'Use visual restraint, explicit labels, and proof of reliability. Trust is earned with calm hierarchy, clear state labels, audit-friendly language, and zero ambiguous actions.',
  },
  {
    terms: ['ecommerce', 'retail', 'consumer', 'marketplace', 'sales'],
    advice: 'Merchandise the decision. Lead with the offer, make comparison effortless, and use social proof or recommendation signals to reduce hesitation.',
  },
  {
    terms: ['saas', 'b2b', 'developer', 'analytics', 'internal', 'admin'],
    advice: 'Prioritize information density with control. Reduce scanning cost, keep actions close to the data they affect, and make system state obvious at a glance.',
  },
]

const AUDIENCE_ADVICE: Array<{ terms: string[]; advice: string }> = [
  {
    terms: ['beginner', 'first-time', 'new user', 'novice'],
    advice: 'Design for confidence-building. Show fewer choices, explain why each step matters, and make the next action unmistakable.',
  },
  {
    terms: ['expert', 'admin', 'operator', 'developer', 'analyst'],
    advice: 'Respect expertise. Keep the surface clean, but expose fast paths, keyboard support, and dense summaries where they save time.',
  },
  {
    terms: ['executive', 'leadership', 'manager'],
    advice: 'Lead with status, trend direction, and business impact. Executives should understand what changed and what needs action within five seconds.',
  },
]

function normalizeText(...values: Array<string | undefined>): string {
  return values
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function hasAnyTerm(haystack: string, terms: string[]): boolean {
  return terms.some(term => haystack.includes(term))
}

function toTitleList(values: string[]): string {
  if (values.length === 0) {
    return 'not specified'
  }

  return values.join(', ')
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)]
}

function buildHighImpactChanges(input: DesignPageInput, projectCtx: ProjectContext, requestContext: string): string[] {
  const combined = normalizeText(input.audience, projectCtx.audience, projectCtx.industry, requestContext)
  const isExistingSurface = hasAnyTerm(combined, ['existing', 'current', 'legacy', 'redesign', 'improve', 'audit', 'refactor'])

  const baseline = isExistingSurface
    ? [
        'Strip visual noise first: remove duplicate actions, weak secondary CTAs, and decorative treatments that compete with the main task.',
        'Re-rank the page so one element dominates immediately: headline, KPI, primary task, or recommended choice.',
        'Move actions next to the data or form section they affect. Reduce cursor travel and decision branching.',
      ]
    : [
        'Define one dominant user outcome for the page and make every section support that path. Anything else becomes secondary or progressive disclosure.',
        'Build the first screen for instant comprehension: strongest headline or metric, one primary CTA, and a short proof block.',
        'Use fewer but larger visual bets. Contrast, spacing, and size should do the hierarchy work before copy is read.',
      ]

  if (input.page_type === 'dashboard') {
    baseline.push('Promote the most decision-driving metric or alert to the top-left and demote passive information below the fold.')
  }

  if (input.page_type === 'form') {
    baseline.push('Reduce form friction by hiding optional fields until they are relevant and converting validation from end-state to inline feedback.')
  }

  if (input.page_type === 'landing_page' || input.page_type === 'pricing') {
    baseline.push('Compress the story into proof, value, and action. Every extra section must earn its place by reducing doubt or increasing motivation.')
  }

  if (hasAnyTerm(combined, ['mobile', 'ios', 'android'])) {
    baseline.push('Collapse lateral complexity. A mobile surface should read top-to-bottom with one primary action per viewport.')
  }

  if (hasAnyTerm(combined, ['finance', 'health', 'security', 'enterprise', 'b2b'])) {
    baseline.push('Increase trust density: add plain-language labels, explicit system status, and visible proof of reliability near moments of commitment.')
  }

  return baseline.slice(0, 5)
}

function rankPrinciples(input: DesignPageInput, projectCtx: ProjectContext, requestContext: string, principles: Principle[]): PrincipleMatch[] {
  const combined = normalizeText(
    input.audience,
    input.context,
    requestContext,
    projectCtx.audience,
    projectCtx.industry,
    projectCtx.device_targets.join(' '),
    projectCtx.custom_rules.join(' ')
  )

  const baseIds = PAGE_TYPE_PRINCIPLES[input.page_type] ?? PAGE_TYPE_PRINCIPLES.dashboard
  const matches = principles.map((principle): PrincipleMatch => {
    const reasons: string[] = []
    let score = 0

    const baseIndex = baseIds.indexOf(principle.id)
    if (baseIndex >= 0) {
      score += 8 - baseIndex
      reasons.push('core to this page type')
    }

    if (principle.applies_to.includes(input.page_type)) {
      score += 2
      reasons.push('explicitly applies to this surface')
    }

    score += EMPHASIS_CATEGORY_BONUS[input.emphasis][principle.category] ?? 0
    if ((EMPHASIS_CATEGORY_BONUS[input.emphasis][principle.category] ?? 0) > 0) {
      reasons.push(`${input.emphasis} emphasis favors ${principle.category}`)
    }

    const principleBonus = EMPHASIS_PRINCIPLE_BONUS[input.emphasis][principle.id] ?? 0
    if (principleBonus > 0) {
      score += principleBonus
      reasons.push(`high leverage for ${input.emphasis}`)
    }

    if (hasAnyTerm(combined, ['beginner', 'first-time', 'new user', 'novice']) && ['cognitive_load', 'progressive_disclosure', 'affordance'].includes(principle.id)) {
      score += 3
      reasons.push('reduces confusion for first-time users')
    }

    if (hasAnyTerm(combined, ['expert', 'admin', 'developer', 'analyst', 'operator']) && ['visual_hierarchy', 'feedback_latency', 'fitts_law'].includes(principle.id)) {
      score += 2
      reasons.push('supports expert-speed workflows')
    }

    if (hasAnyTerm(combined, ['existing', 'current', 'legacy', 'redesign', 'improve', 'audit', 'refactor']) && ['feedback_latency', 'cognitive_load', 'affordance', 'halo_effect'].includes(principle.id)) {
      score += 2
      reasons.push('high-impact for refactoring existing UI')
    }

    if (hasAnyTerm(combined, ['mobile', 'ios', 'android']) && ['fitts_law', 'hicks_law', 'progressive_disclosure', 'feedback_latency'].includes(principle.id)) {
      score += 3
      reasons.push('important for constrained mobile flows')
    }

    if (hasAnyTerm(combined, ['fintech', 'finance', 'bank', 'insurance', 'health', 'healthcare', 'medical', 'legal', 'security']) && ['halo_effect', 'feedback_latency', 'visual_hierarchy', 'affordance'].includes(principle.id)) {
      score += 3
      reasons.push('supports trust in regulated contexts')
    }

    if (hasAnyTerm(combined, ['ecommerce', 'retail', 'consumer', 'marketplace', 'sales']) && ['anchoring_bias', 'halo_effect', 'f_pattern', 'color_psychology'].includes(principle.id)) {
      score += 3
      reasons.push('improves persuasion on commercial pages')
    }

    return {
      principle,
      score,
      reasons: dedupe(reasons),
    }
  })

  return matches
    .sort((left, right) => right.score - left.score || left.principle.title.localeCompare(right.principle.title))
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

  // Load KB content
  const kbVisualPrinciples = loadKBVisualPrinciples()
  const kbBrandExamples    = loadKBBrandExamples()
  const kbTypoSpec         = loadKBTypographySpec()

  const requestContext = [
    context,
    projectCtx.project_name ? `Project: ${projectCtx.project_name}` : '',
    projectCtx.stack ? `Stack: ${projectCtx.stack}` : '',
    projectCtx.industry ? `Industry: ${projectCtx.industry}` : '',
    projectCtx.device_targets.length > 0 ? `Devices: ${projectCtx.device_targets.join(', ')}` : '',
  ].filter(Boolean).join(' | ')

  const rankedPrinciples = rankPrinciples(input, projectCtx, requestContext, principles)
  const topPrinciples = rankedPrinciples.slice(0, 3)

  const layoutAdvice   = LAYOUT_ADVICE[page_type]?.[emphasis]   ?? ''
  const typoAdvice     = TYPOGRAPHY_ADVICE[emphasis]             ?? ''
  const colorAdvice    = COLOR_ADVICE[emphasis]                  ?? ''

  const combinedContext = normalizeText(audience, requestContext, projectCtx.industry, projectCtx.audience, projectCtx.device_targets.join(' '))
  const deviceAdvice = projectCtx.device_targets
    .map(device => DEVICE_ADVICE[device.toLowerCase()])
    .filter(Boolean)
    .join(' ')

  const industryAdvice = INDUSTRY_ADVICE
    .filter(entry => hasAnyTerm(combinedContext, entry.terms))
    .map(entry => entry.advice)
    .join(' ')

  const audienceAdvice = AUDIENCE_ADVICE
    .filter(entry => hasAnyTerm(combinedContext, entry.terms))
    .map(entry => entry.advice)
    .join(' ')

  const highImpactChanges = buildHighImpactChanges(input, projectCtx, requestContext)

  const principleSection = topPrinciples.map(({ principle, reasons }) => {
    const rules = principle.rules.slice(0, 2).map(rule => `  - ${rule}`).join('\n')
    const doItem = principle.dos[0] ? `  - Do: ${principle.dos[0]}` : ''
    const dontItem = principle.donts[0] ? `  - Avoid: ${principle.donts[0]}` : ''
    const whyItMatters = reasons.length > 0 ? `**Why now:** ${reasons.join('; ')}.` : ''
    return `### ${principle.title}\n${principle.summary}\n${whyItMatters}\n\n**Key rules:**\n${rules}\n${doItem}\n${dontItem}`
  }).join('\n\n')

  const mistakes = topPrinciples
    .flatMap(({ principle }) => principle.donts.slice(0, 1))
    .map(d => `- ${d}`)
    .join('\n')

  const strategyContext = [
    `Stored audience: ${projectCtx.audience || 'not set'}`,
    `Stored industry: ${projectCtx.industry || 'not set'}`,
    `Stored devices: ${toTitleList(projectCtx.device_targets)}`,
  ].join(' | ')

  const brandSection = projectCtx.brand.primary_color
    ? `\n## Brand Context\nPrimary color: ${projectCtx.brand.primary_color} | Theme: ${projectCtx.brand.theme} | Font: ${projectCtx.brand.font || 'not set'}`
    : ''

  const customRulesSection = projectCtx.custom_rules.length > 0
    ? `\n## Project Custom Rules\n${projectCtx.custom_rules.map(r => `- ${r}`).join('\n')}`
    : ''

  const deviceSection = deviceAdvice || industryAdvice || audienceAdvice
    ? `\n## Adaptation Layer\n${[deviceAdvice, industryAdvice, audienceAdvice].filter(Boolean).join(' ')}`
    : ''

  const impactSection = `\n## High-Impact Changes\n${highImpactChanges.map(change => `- ${change}`).join('\n')}`

  // ─── KB enrichment ──────────────────────────────────────────────────────────

  // 1. Typography enrichment from KB spec
  const kbTypo = getTypographyFonts(page_type, projectCtx.industry, emphasis, kbTypoSpec)
  const typoEnrichmentSection = kbTypoSpec
    ? `\n### Font Recommendations (KB)\n` +
      `**Recommended families:** ${kbTypo.fontFamily}\n` +
      (kbTypo.pairings ? `**Pairings for ${page_type.replace('_', ' ')}:** ${kbTypo.pairings}\n` : '') +
      (kbTypo.headlineGuidance ? `**Headline guidance:** ${kbTypo.headlineGuidance}\n` : '') +
      `**Body size:** ${kbTypoSpec.size_scale.find(s => s.role === 'Body')?.desktop ?? '16–18px'} desktop / ` +
      `${kbTypoSpec.size_scale.find(s => s.role === 'Body')?.mobile ?? '16–18px'} mobile\n` +
      `**Line-height (body):** ${kbTypoSpec.line_height_scale.find(l => l.role === 'Body')?.value ?? '1.45–1.7'}`
    : ''

  // 2. Visual design principles from KB (top 2 for this page_type + emphasis)
  const selectedKBPrinciples = selectKBPrinciples(page_type, emphasis, kbVisualPrinciples, 2)
  const kbPrincipleSection = selectedKBPrinciples.length > 0
    ? `\n## Visual Design Foundation (KB)\n\n` +
      selectedKBPrinciples.map(p => {
        const howLines = p.how.slice(0, 2).map(h => `  - ${h}`).join('\n')
        const implLine = p.implementation[0] ? `  - ${p.implementation[0]}` : ''
        const example  = p.examples[0] ? `\n**Example:** ${p.examples[0]}` : ''
        const failure  = `\n**Avoid:** ${p.failure_mode}`
        return `### ${p.title}\n${p.summary}\n\n**How to use:**\n${howLines}\n${implLine}${example}${failure}`
      }).join('\n\n')
    : ''

  // 3. Brand emotional direction from KB
  const brandMatch = findBrandMatch(projectCtx.industry, emphasis, kbBrandExamples)
  const kbBrandSection = brandMatch
    ? `\n## Emotional Direction (KB)\n` +
      `**Reference brand:** ${brandMatch.brand}\n` +
      `**Emotional effect:** ${brandMatch.emotional_effect}\n` +
      `**Design lesson:** ${brandMatch.design_lesson}\n` +
      `**Signals to adopt:**\n${brandMatch.design_signals.map(s => `- ${s}`).join('\n')}\n` +
      `**Type direction:** ${brandMatch.type_direction}\n` +
      `**Color direction:** ${brandMatch.color_direction}`
    : ''

  // ─── Enhanced checklist from KB section 9 ───────────────────────────────────
  const kbChecklist = `\n## Review Checklist\n` +
    `### Attention and hierarchy\n` +
    `- [ ] Is there one obvious focal point?\n` +
    `- [ ] Is the headline or primary KPI visibly dominant?\n` +
    `- [ ] Does the CTA stand out without screaming?\n` +
    `### Readability and contrast\n` +
    `- [ ] Is all critical text WCAG AA compliant (4.5:1 minimum)?\n` +
    `- [ ] Are supporting and primary text clearly differentiated?\n` +
    `- [ ] Are there too many high-contrast competitors on one screen?\n` +
    `### Structure and grouping\n` +
    `- [ ] Are related items grouped tightly enough?\n` +
    `- [ ] Are actions positioned near the objects they affect?\n` +
    `- [ ] Is the alignment clean enough to feel intentional?\n` +
    `### Interaction and psychology\n` +
    `- [ ] Is choice count low enough for fast decisions (≤7 nav items)?\n` +
    `- [ ] Are touch targets at least 44×44px on mobile?\n` +
    `- [ ] Does the system give immediate feedback for every async action?\n` +
    `- [ ] Are defaults helping the user, not only the business?\n` +
    `### Brand and emotion\n` +
    `- [ ] Does the interface emotion match the product promise?\n` +
    `- [ ] Do typography, color, spacing, and imagery tell the same story?\n` +
    `### Ethics and accessibility\n` +
    `- [ ] Would this flow still feel fair if the user were in a hurry or under stress?\n` +
    `- [ ] Does the interface work with keyboard, screen reader, and reduced motion?`

  return `# UI Design Strategy: ${page_type.replace('_', ' ')} for ${audience}
**Emphasis:** ${emphasis} | **Page type:** ${page_type}${context ? `\n**Context:** ${context}` : ''}\n**Resolved context:** ${strategyContext}${brandSection}${customRulesSection}${deviceSection}${impactSection}

---

## Layout Recommendation
${layoutAdvice}

## Typography
${typoAdvice}
${typoEnrichmentSection}

## Color Strategy
${colorAdvice}

---

## Psychology Principles to Apply (Top 3)

${principleSection}

---
${kbPrincipleSection}
${kbBrandSection}

## Common Mistakes to Avoid
${mistakes}

---
${kbChecklist}
`
}
