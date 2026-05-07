import { z } from 'zod'
import { DEFAULT_PAGE_MODEL, saveContext, saveState, type ChangeBehavior, type DensityPreference, type DesignGoal, type PageMode, type PageType, type SourceType, type WorkingMode } from '../storage/storage.js'

const WORKING_MODE_OPTIONS = ['improve_existing', 'start_from_scratch', 'analyze_only', 'preview_redesign', 'apply_safe_changes'] as const
const SURFACE_OPTIONS = ['dashboard', 'landing_page', 'form', 'settings', 'onboarding', 'pricing', 'navigation', 'content_page', 'other'] as const
const GOAL_OPTIONS = ['clarity', 'conversion', 'trust', 'speed', 'engagement', 'visual_polish'] as const
const AUDIENCE_OPTIONS = ['developers', 'admins', 'consumers', 'executives', 'mixed_audience'] as const
const DESIGN_TONE_OPTIONS = ['minimal', 'bold', 'professional', 'playful', 'premium', 'technical'] as const
const DENSITY_OPTIONS = ['compact', 'balanced', 'spacious'] as const
const CHANGE_BEHAVIOR_OPTIONS = ['suggest_only', 'preview_then_ask', 'auto_apply_safe_changes'] as const
const EXISTING_INPUT_OPTIONS = ['code_only', 'code_plus_dom', 'json_or_markdown_brief', 'mixed', 'not_sure'] as const
const BRIEF_COMPLETENESS_OPTIONS = ['just_an_idea', 'basic_product_brief', 'detailed_product_spec', 'full_constraints_defined'] as const

export const startSessionShape = {
  working_mode: z.enum(WORKING_MODE_OPTIONS).describe('Choose whether to improve an existing UI or start from scratch.'),
  surface_type: z.enum(SURFACE_OPTIONS).describe('The current or target page type.'),
  primary_goal: z.enum(GOAL_OPTIONS).describe('The primary outcome that matters most for this session.'),
  audience: z.enum(AUDIENCE_OPTIONS).describe('The main intended audience for the page.'),
  design_tone: z.enum(DESIGN_TONE_OPTIONS).describe('The desired visual and emotional tone.'),
  density_preference: z.enum(DENSITY_OPTIONS).describe('How compact or spacious the UI should feel.'),
  change_behavior: z.enum(CHANGE_BEHAVIOR_OPTIONS).describe('How aggressively the assistant should propose or apply changes.'),
  existing_input: z.enum(EXISTING_INPUT_OPTIONS).optional().describe('For existing UI work, what evidence is already available.'),
  brief_completeness: z.enum(BRIEF_COMPLETENESS_OPTIONS).optional().describe('For greenfield work, how complete the current brief is.'),
  additional_notes: z.string().optional().describe('Optional freeform notes such as constraints, must-keep elements, or brand references.'),
}

export type StartSessionInput = {
  working_mode: typeof WORKING_MODE_OPTIONS[number]
  surface_type: typeof SURFACE_OPTIONS[number]
  primary_goal: typeof GOAL_OPTIONS[number]
  audience: typeof AUDIENCE_OPTIONS[number]
  design_tone: typeof DESIGN_TONE_OPTIONS[number]
  density_preference: typeof DENSITY_OPTIONS[number]
  change_behavior: typeof CHANGE_BEHAVIOR_OPTIONS[number]
  existing_input?: typeof EXISTING_INPUT_OPTIONS[number]
  brief_completeness?: typeof BRIEF_COMPLETENESS_OPTIONS[number]
  additional_notes?: string
}

function mapWorkingModeToPageMode(workingMode: WorkingMode): PageMode {
  return workingMode === 'start_from_scratch' ? 'greenfield' : 'existing'
}

function mapAudience(audience: StartSessionInput['audience']): string[] {
  const mapping: Record<StartSessionInput['audience'], string[]> = {
    developers: ['developers'],
    admins: ['admins'],
    consumers: ['consumers'],
    executives: ['executives'],
    mixed_audience: ['developers', 'admins', 'consumers', 'executives'],
  }

  return mapping[audience]
}

function mapExistingInput(existingInput?: StartSessionInput['existing_input']): SourceType[] {
  const mapping: Record<NonNullable<StartSessionInput['existing_input']>, SourceType[]> = {
    code_only: ['tsx', 'jsx', 'html', 'css'],
    code_plus_dom: ['tsx', 'jsx', 'html', 'css', 'dom'],
    json_or_markdown_brief: ['json', 'markdown'],
    mixed: ['prompt', 'json', 'markdown', 'tsx', 'jsx', 'html', 'css', 'dom'],
    not_sure: ['prompt'],
  }

  return existingInput ? mapping[existingInput] : ['prompt']
}

function buildNextStep(input: StartSessionInput, pageMode: PageMode): string {
  if (pageMode === 'existing') {
    if (input.existing_input === 'code_plus_dom') {
      return 'Analyze the existing page model from code plus runtime structure, then propose the top 3 improvements.'
    }

    if (input.existing_input === 'code_only') {
      return 'Analyze the existing page from source code first, then ask for a screenshot only if visual intent remains ambiguous.'
    }

    if (input.existing_input === 'not_sure') {
      return 'Start from the prompt and visible code context, then ask one follow-up question only if confidence stays low.'
    }

    return 'Normalize the available evidence into a page model and rank the top 3 improvement opportunities.'
  }

  if (input.brief_completeness === 'just_an_idea') {
    return 'Use the session answers as the initial brief, then ask one clarifying follow-up before generating a page strategy.'
  }

  return 'Use the current brief and session answers to generate a first page model and a bounded design strategy.'
}

function buildOpenQuestions(input: StartSessionInput, pageMode: PageMode): string[] {
  const questions: string[] = []

  if (pageMode === 'existing' && input.existing_input === 'not_sure') {
    questions.push('Which source should the analysis trust most: code, runtime DOM, or a screenshot?')
  }

  if (pageMode === 'greenfield' && input.brief_completeness === 'just_an_idea') {
    questions.push('What is the main user task the first screen should optimize for?')
  }

  return questions
}

function buildSessionSummary(input: StartSessionInput, pageMode: PageMode, sourceTypes: SourceType[]): string {
  const sourceSummary = sourceTypes.length > 0 ? sourceTypes.join(', ') : 'prompt'
  return [
    `Mode: ${pageMode}`,
    `Surface: ${input.surface_type}`,
    `Goal: ${input.primary_goal}`,
    `Audience: ${input.audience}`,
    `Tone: ${input.design_tone}`,
    `Density: ${input.density_preference}`,
    `Behavior: ${input.change_behavior}`,
    `Evidence: ${sourceSummary}`,
  ].join(' | ')
}

export function startSession(input: StartSessionInput): string {
  const pageMode = mapWorkingModeToPageMode(input.working_mode)
  const sourceTypes: SourceType[] = pageMode === 'existing'
    ? mapExistingInput(input.existing_input)
    : ['prompt', 'json', 'markdown'] as SourceType[]

  const context = saveContext({
    audience: input.audience,
    preferences: {
      working_mode: input.working_mode as WorkingMode,
      change_behavior: input.change_behavior as ChangeBehavior,
      density_preference: input.density_preference as DensityPreference,
    },
    brand: {
      tone: [input.design_tone],
    },
    constraints: {
      input_preference: sourceTypes,
    },
  })

  const openQuestions = buildOpenQuestions(input, pageMode)
  const nextStep = buildNextStep(input, pageMode)
  const pageModel = {
    ...DEFAULT_PAGE_MODEL,
    mode: pageMode,
    source_types: sourceTypes,
    intent: {
      ...DEFAULT_PAGE_MODEL.intent,
      primary_goal: input.primary_goal as DesignGoal,
    },
    product_context: {
      ...DEFAULT_PAGE_MODEL.product_context,
      product_name: context.project_name,
      industry: context.industry,
      audience: mapAudience(input.audience),
      device_targets: context.device_targets,
      brand_tone: [input.design_tone],
      density_preference: input.density_preference as DensityPreference,
    },
    surface: {
      ...DEFAULT_PAGE_MODEL.surface,
      page_type: input.surface_type as PageType,
    },
    evidence: {
      ...DEFAULT_PAGE_MODEL.evidence,
      prompt_summary: input.additional_notes ?? '',
      brief_sources: sourceTypes,
    },
    open_questions: openQuestions,
  }

  saveState({
    current_stage: 'PLAN',
    updated_at: new Date().toISOString(),
    active_page: {
      page_id: input.surface_type,
      last_analyzed_at: '',
      page_model: pageModel,
      analysis_confidence: 0.35,
    },
    session: {
      current_mode: pageMode,
      pending_questions: openQuestions,
      pending_recommendations: [],
    },
    watch: {
      enabled: true,
      auto_refresh_on_agent_action: true,
      last_trigger_source: sourceTypes[0] ?? 'prompt',
    },
  })

  const notes = input.additional_notes ? `\nNotes: ${input.additional_notes}` : ''

  return `# UI Craft Session Started
${buildSessionSummary(input, pageMode, sourceTypes)}${notes}

## Next Step
${nextStep}

## Open Questions
${openQuestions.length > 0 ? openQuestions.map(question => `- ${question}`).join('\n') : '- None. The assistant has enough context to proceed.'}
`
}