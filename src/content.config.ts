import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/* ------------------------------------------------------------------
   The Library's data model. Four collections:

   shelves  — one per subject. Owns the learning path (ordered stages).
   sources  — books / papers / courses / sites, each filed on a shelf and
              (optionally) pinned to a stage of that shelf's path.
   notes    — short working notes: a claim, a derivation, a summary.
   essays   — long-form. `status: draft` still renders, marked as such.

   Everything is plain Markdown/JSON in src/content, which is the whole
   point: a stranger can open a PR that adds a source. See README.
   ------------------------------------------------------------------ */

const accent = z.enum(['verm', 'cobalt', 'verd', 'plum', 'ink']);

const shelves = defineCollection({
  loader: glob({ base: './src/content/shelves', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    callNumber: z.string(),           // library-style tag, e.g. "PK 332.6"
    tagline: z.string(),
    accent: accent.default('ink'),
    status: z.enum(['open', 'opening']).default('open'),
    order: z.number().default(99),
    path: z.array(z.object({          // the curriculum, in order
      title: z.string(),
      desc: z.string(),
    })).default([]),
  }),
});

const sources = defineCollection({
  loader: file('./src/content/sources.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    type: z.enum(['book', 'paper', 'course', 'site', 'talk', 'dataset', 'tool']),
    shelf: z.string(),                // shelf id
    stage: z.number().optional(),     // 1-based index into shelf.path
    year: z.number().optional(),
    url: z.string().url().optional(),
    why: z.string(),                  // one line: why it earned its place
    tags: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    shelf: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const essays = defineCollection({
  loader: glob({ base: './src/content/essays', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    shelf: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    status: z.enum(['draft', 'published']).default('draft'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { shelves, sources, notes, essays };
