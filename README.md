# sovi11.github.io

Pravar Kataria's site: a personal page and a **public learning library** — every shelf is a
subject learned from the ground floor, laid out as a path with sources and notes.

Live: <https://sovi11.github.io>

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/ + Pagefind search index
npm run preview    # serve dist/ (search works here; not in dev)
```

Deploys automatically to GitHub Pages on push to `main` (`.github/workflows/deploy.yml`).
One-time setup on GitHub: *Settings → Pages → Source: GitHub Actions*.

## Contribute a source

Everything in the library is plain content in `src/content`:

| Where | What |
|---|---|
| `shelves/*.md` | one file per subject — the **path** (ordered stages) lives in the frontmatter |
| `sources.json` | every book / paper / course, filed on a `shelf` and pinned to a `stage` |
| `notes/*.md` | short working notes |
| `essays/*.md` | long-form; `status: draft` still renders, stamped as a draft |

To add a source: fork, append an object to `sources.json` with a `shelf`, a `stage`, and one
honest line for `why` it earned its place, then open a PR. The schema is enforced at build
time by `src/content.config.ts`, so a bad entry fails loudly rather than silently.

The bar is not "good book". It is "the thing I'd hand someone at that stage of that path".

## Structure

```
src/
  content.config.ts    collection schemas (Zod)
  content/             shelves, sources, notes, essays
  layouts/Base.astro   nav, footer, fonts, meta
  components/          ShelfCard, SourceRow, SectionHead
  pages/               index, library/, writing, projects, about, work/, life/, search, 404
  styles/global.css    the design system
public/                photo, CV, favicon
```

Stack: Astro 7, Markdown content collections, Pagefind for search. No client framework, no
trackers, no server.
