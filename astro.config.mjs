import { defineConfig } from 'astro/config';

// GitHub Pages project site. With a custom domain: set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://e-haroun.github.io',
  base: '/HaruPortfolio',
  trailingSlash: 'always',
});
