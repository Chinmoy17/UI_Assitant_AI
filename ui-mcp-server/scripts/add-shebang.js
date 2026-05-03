const fs = require('fs')
const f = 'dist/server.js'
if (!fs.existsSync(f)) process.exit(0)
let c = fs.readFileSync(f, 'utf8')
if (!c.startsWith('#!/usr/bin/env node')) {
  fs.writeFileSync(f, '#!/usr/bin/env node\n' + c)
}
