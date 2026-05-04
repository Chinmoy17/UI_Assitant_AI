import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { designPage, designPageShape, type DesignPageInput } from './tools/design_page.js'
import { appendHistory } from './storage/storage.js'

const server = new McpServer({
  name: 'ui-craft',
  version: '0.2.0',
})

// @ts-ignore TS2589: known MCP SDK type inference depth issue
server.tool(
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

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err.message}\n`)
  process.exit(1)
})
