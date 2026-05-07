import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { designPage, designPageShape, type DesignPageInput } from './tools/design_page.js'
import { startSession, startSessionShape, type StartSessionInput } from './tools/start_session.js'
import { appendHistory, loadContext, saveContext, type ProjectContextUpdate } from './storage/storage.js'

const server = new McpServer({
  name: 'ui-craft',
  version: '0.2.0',
})

type TextToolHandler = (input: unknown) => Promise<{
  content: Array<{ type: 'text'; text: string }>
}>

function registerTool(
  name: string,
  description: string,
  shape: Record<string, z.ZodTypeAny>,
  handler: TextToolHandler,
): void {
  const register = server.tool.bind(server) as unknown as (
    toolName: string,
    toolDescription: string,
    toolShape: Record<string, z.ZodTypeAny>,
    toolHandler: TextToolHandler,
  ) => void

  register(name, description, shape, handler)
}

registerTool(
  'design_page',
  'Generate a comprehensive UI design strategy for a specific page type. ' +
  'Returns layout recommendations, typography, color strategy, and the top psychology ' +
  'principles to apply — grounded in cognitive science and UX research.',
  designPageShape,
  async (input) => {
    const result = designPage(input as DesignPageInput)

    // lazy: storage only initializes on first actual tool call
    appendHistory({
      tool: 'design_page',
      input: input as Record<string, unknown>,
      summary: `Designed ${(input as DesignPageInput).page_type} for ${(input as DesignPageInput).audience}`,
    })

    return {
      content: [{ type: 'text', text: result }],
    }
  }
)

const projectContextShape = {
  project_name: z.string().optional(),
  stack: z.string().optional(),
  audience: z.string().optional(),
  industry: z.string().optional(),
  brand: z.object({
    primary_color: z.string().optional(),
    font: z.string().optional(),
    theme: z.enum(['light', 'dark', 'custom']).optional(),
  }).optional(),
  device_targets: z.array(z.string()).optional(),
  custom_rules: z.array(z.string()).optional(),
}

registerTool(
  'get_project_context',
  'Read the current project context stored in the local .vscode/ui-assistant/context.json file for this user workspace.',
  {},
  async () => {
    const context = loadContext()

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(context, null, 2),
      }],
    }
  }
)

registerTool(
  'set_project_context',
  'Update the local project context used to tailor UI design recommendations for this workspace.',
  projectContextShape,
  async (input) => {
    saveContext(input as ProjectContextUpdate)

    appendHistory({
      tool: 'set_project_context',
      input: input as Record<string, unknown>,
      summary: 'Updated local project context',
    })

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(loadContext(), null, 2),
      }],
    }
  }
)

registerTool(
  'start_session',
  'Initialize a UI Craft session from structured MCQ-style answers so the assistant can adapt recommendations for existing UI or greenfield work.',
  startSessionShape,
  async (input) => {
    const result = startSession(input as StartSessionInput)

    appendHistory({
      tool: 'start_session',
      input: input as Record<string, unknown>,
      summary: `Started ${(input as StartSessionInput).working_mode} session for ${(input as StartSessionInput).surface_type}`,
    })

    return {
      content: [{ type: 'text', text: result }],
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err.message}\n`)
  process.exit(1)
})
