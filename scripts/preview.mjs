import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'

const root = resolve('dist/client')
const port = Number(process.env.PORT ?? 4173)
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

await stat(resolve(root, 'index.html'))

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    let file = resolve(root, `.${pathname}`)
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(400).end('Bad request')
      return
    }
    let status = 200
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
      await stat(file)
    } catch {
      file = resolve(root, '404.html')
      status = 404
    }
    const content = await readFile(file)
    response.writeHead(status, {
      'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream',
    })
    response.end(request.method === 'HEAD' ? undefined : content)
  } catch {
    response.writeHead(400).end('Bad request')
  }
})

server.listen(port, '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${port}`))
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close())
