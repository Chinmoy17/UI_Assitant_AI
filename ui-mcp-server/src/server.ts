import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { designPage, designPageShape, type DesignPageInput } from './tools/design_page.js'

const server = new McpServer({
  name: 'ui-craft',
  version: '0.1.0',
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
