const fs = require('fs')
const path = require('path')

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(srcPath, destPath)
    else fs.copyFileSync(srcPath, destPath)
  }
}

copyDir(path.join(__dirname, '..', 'src', 'content'), path.join(__dirname, '..', 'dist', 'content'))
console.log('Content files copied to dist/')
