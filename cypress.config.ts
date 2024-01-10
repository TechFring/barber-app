import { defineConfig } from 'cypress';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
  env: {
    LOGIN: process.env['CYPRESS_LOGIN'] as string,
    PASSWORD: process.env['CYPRESS_PASSWORD'] as string,
  }
});
