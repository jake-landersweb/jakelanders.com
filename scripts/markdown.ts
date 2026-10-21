import { marked } from 'marked'

// data.ts supplies canonical metadata. Parse only simple key/value frontmatter;
// no YAML runtime is necessary for rendering the body.
export function parseFrontmatter(source: string) {
  const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(normalized)
  const frontmatter: Record<string, string> = {}
  if (!match) return { frontmatter, body: normalized }
  for (const line of match[1]!.split('\n')) {
    const entry = /^([\w-]+):\s*(.*?)\s*$/.exec(line)
    if (entry) frontmatter[entry[1]!] = entry[2]!.replace(/^(['"])(.*)\1$/, '$2')
  }
  return { frontmatter, body: normalized.slice(match[0].length) }
}

export function renderMarkdown(source: string) {
  // The post route renders the title, so drop a leading H1 that repeats it.
  const body = parseFrontmatter(source).body.replace(/^\s*# [^\n]*\n/, '')
  return marked.parse(body, { async: false })
}
