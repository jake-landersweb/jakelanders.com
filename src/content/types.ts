export type Link = { label: string; href: string }
export type Project = { name: string; year?: string; blurb: string; tech: string[]; links: Link[] }
export type Job = { org: string; role: string; dates: string; blurb: string }
export type Post = { slug: string; title: string; date: string; summary?: string; tags: string[] }
export type Site = {
  name: string
  tagline: string
  bio: string[]
  location?: string
  email?: string
  links: Link[]
  jobs: Job[]
  education: Job[]
  projects: Project[]
  skills: Record<string, string[]>
}
