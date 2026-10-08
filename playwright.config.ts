import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: { baseURL: 'http://localhost:4321/HaruPortfolio/' },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321/HaruPortfolio/',
    reuseExistingServer: true,
  },
});
