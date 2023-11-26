import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  "defaultCommandTimeout": 20000, // in milliseconds
  "requestTimeout": 30000, // in milliseconds
  "responseTimeout": 30000, // in milliseconds
  "pageLoadTimeout": 60000, // in milliseconds

  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here
    },
    specPattern: 'dist/src/**/*.cy.{ts,js,tsx}',
  },
});
