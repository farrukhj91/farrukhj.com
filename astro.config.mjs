import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkUnwrapImages from 'remark-unwrap-images';

export default defineConfig({
  site: 'https://farrukhj.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/writing'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkUnwrapImages],
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
