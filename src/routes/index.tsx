import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { posts, site } from '~/content/data'
import { sortedPosts } from '~/lib/post-index'
import type { Job } from '~/content/types'
import { PostList } from '~/components/post-list'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: site.name }, { name: 'description', content: site.tagline }] }),
  component: Home,
})

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="rows">
      {jobs.map((job) => (
        <li key={`${job.org}-${job.role}`}>
          <div className="row-head">
            <strong>{job.org}</strong>
            <span className="muted">{job.dates}</span>
          </div>
          <p className="muted">{job.role}</p>
          <p>{job.blurb}</p>
        </li>
      ))}
    </ul>
  )
}

function Home() {
  const links = site.email
    ? [...site.links, { label: 'Email', href: `mailto:${site.email}` }]
    : site.links

  return (
    <>
      <header className="intro">
        <h1>{site.tagline}</h1>
        {site.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="inline-links" aria-label="Find me online">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </header>

      <Section id="projects" title="Projects">
        <ul className="rows">
          {site.projects.map((project) => (
            <li key={project.name}>
              <div className="row-head">
                <strong>{project.name}</strong>
                {project.year && <span className="muted">{project.year}</span>}
              </div>
              <p>{project.blurb}</p>
              {project.tech.length > 0 && <p className="muted">{project.tech.join(' / ')}</p>}
              {project.links.length > 0 && (
                <ul className="inline-links">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="work" title="Work">
        <JobList jobs={site.jobs} />
      </Section>

      {site.education.length > 0 && (
        <Section id="education" title="Education">
          <JobList jobs={site.education} />
        </Section>
      )}

      <Section id="skills" title="Skills">
        <dl className="skills">
          {Object.entries(site.skills).map(([category, skills]) => (
            <div key={category}>
              <dt>{category}</dt>
              <dd>{skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {posts.length > 0 && (
        <Section id="writing" title="Writing">
          <PostList posts={sortedPosts.slice(0, 5)} />
          <p>
            <a href="/posts">All writing →</a>
          </p>
        </Section>
      )}
    </>
  )
}
