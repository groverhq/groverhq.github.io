// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://groverhq.com',
  output: 'static',
  compressHTML: true,
  integrations: [
    sitemap({
      serialize: (item) => {
        // Auto-assign priority based on URL depth
        // Home (/) = 1.0, /services = 0.9, deeper pages = 0.8
        const url = new URL(item.url);
        const depth = url.pathname.split('/').filter(Boolean).length;

        if (depth === 0) {
          item.priority = 1.0; // Home
          item.changefreq = ChangeFreqEnum.WEEKLY; // Home page changes weekly
        } else if (depth === 1) {
          item.priority = 0.9; // Main pages
          item.changefreq = ChangeFreqEnum.MONTHLY; // Main pages change monthly
        } else {
          item.priority = 0.8; // Deeper pages
          item.changefreq = ChangeFreqEnum.YEARLY; // Deeper pages change yearly
        }

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'terser',
      cssCodeSplit: true,
      terserOptions: {
        // @ts-expect-error - compress is valid Terser option not in type definitions
        compress: {
          drop_console: true
        },
      }
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});