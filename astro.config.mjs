// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jetlinetransport.ca',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Photography is graded and committed under src/assets/photos; Astro only
    // needs to produce the responsive derivatives.
    responsiveStyles: false,
  },
});
