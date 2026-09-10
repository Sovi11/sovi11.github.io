import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site → served from the root of sovi11.github.io, so no `base`.
// A custom domain later only changes `site`.
export default defineConfig({
  site: 'https://sovi11.github.io',
  integrations: [sitemap()],
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
