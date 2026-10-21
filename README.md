# Jake Landers’ personal site

A plain, static, white-and-black homepage and Markdown archive. Requires Node 24 and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs at http://localhost:3000. Production commands:

```sh
pnpm typecheck
pnpm lint
pnpm fmt:check
pnpm build
pnpm preview
```

`pnpm fmt` formats implementation files. The content worker’s files and the exact shared types contract are excluded from automatic formatting. Lint excludes content data to preserve its independent ownership; typechecking includes it.

## Deploy

Pushing to `main` runs `.github/workflows/build-web.yaml`, which builds the root `Dockerfile` and pushes `ghcr.io/jake-landersweb/jakelanders.com-web` (tagged `latest` and with the version tag). The image is nginx serving the prerendered `dist/client/` on port 3000, with `404.html` as the error page and redirects from the old `/blog` and `/contact` URLs.

`pnpm preview` serves `dist/client/` at http://127.0.0.1:4173, including the custom error page. Set `PORT` to change its port. Stop with Ctrl-C.

## Content

`src/content/data.ts` exports the typed `site` and `posts` metadata. Each post must have a matching `src/content/posts/<slug>.md`; slugs use lowercase letters, numbers, and hyphens. An empty posts array is supported and hides the homepage Writing section. Education is shown as “Not listed” when no entries are supplied. Posts are sorted newest first; the homepage shows the latest five.

Markdown is loaded with Vite’s eager `import.meta.glob` and `?raw`. A small Vite pre-loader compiles those local Markdown imports to HTML during the build, strips simple frontmatter, and keeps `marked` out of the browser bundle. Metadata from `data.ts` is authoritative. Markdown is trusted repository content; raw HTML is supported. Code blocks use plain `<pre><code>` with no syntax highlighting. No custom client interactions, fonts, icons, UI library, or analytics are included; TanStack’s standard React hydration remains.

The content worker owns `src/content/data.ts`, `src/content/posts/`, `public/images/`, and `CONTENT_NOTES.md`. The scaffold does not rewrite those files.

## Tooling choices

- TanStack Start 1.169.3 and Router 1.170.45 use file-based routes and the current Vite plugin. `prerender.enabled`, `crawlLinks`, and `failOnError` generate all linked posts. `/404` is explicitly output as `404.html`.
- TypeScript 7.0.2 is the stable native Go compiler now published as `typescript`. Its executable is `tsc`, so `typecheck` uses `tsc --noEmit` rather than the older preview package’s `tsgo` command.
- Oxlint 1.89.0 and Oxfmt 0.74.0 provide linting and formatting.
- Vite’s preview host is explicitly `127.0.0.1` to avoid a local IPv6 resolution/binding mismatch during prerendering.
- Only the requested link colors add color. Post images are displayed in monochrome through CSS; the original image files are unchanged.

References checked during implementation: [TanStack setup](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch), [static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering), [Oxfmt configuration](https://oxc.rs/docs/guide/usage/formatter/config.html), and the live npm registry for released package versions.
