const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,

  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportHeight: 900,
    viewportWidth: 1440,
    
    downloadsFolder: "cypress/downloads",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
