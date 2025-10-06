const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

// Cypress E2E Testing Configuration
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationteststore.com',
    
    // Browser viewport
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // File patterns and locations
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.feature'
    ],
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    
    // Output folders
    screenshotsFolder: 'cypress/output/screenshots',
    videosFolder: 'cypress/output/videos',
    downloadsFolder: 'cypress/output/downloads',
    
    // Recording settings
    video: true,
    screenshotOnRunFailure: true,
    
    // Test behavior
    testIsolation: true,
    
    // Timeouts (milliseconds)
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    // Retry strategy
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    chromeWebSecurity: false,

    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })

      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)
      
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      return config
    },
  },
})
