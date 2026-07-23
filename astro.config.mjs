// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://autowiss.ch',
  // Emit /offerte.html, /danke.html (not /offerte/) so existing URLs, external
  // links and the Formspree redirect keep working unchanged.
  build: { format: 'file' },
  integrations: [
    icon(),
    sitemap({
      // Only the homepage is indexable; offerte + danke are noindex, so the
      // sitemap should list the homepage alone.
      filter: (page) => !/(offerte|danke)/.test(page),
    }),
  ],
});
