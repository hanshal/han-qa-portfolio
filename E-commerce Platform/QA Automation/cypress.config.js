const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Base URL for your application
    baseUrl: 'https://automationteststore.com',
    
    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Test files pattern
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support file
    supportFile: 'cypress/support/e2e.js',
    
    // Fixtures folder
    fixturesFolder: 'cypress/fixtures',
    
    // Screenshots and videos configuration
    screenshotsFolder: 'cypress/output/screenshots',
    videosFolder: 'cypress/output/videos',
    video: true,
    screenshotOnRunFailure: true,
    
    // Downloads folder
    downloadsFolder: 'cypress/output/downloads',
    
    // Test isolation
    testIsolation: true,
    
    // Default command timeout
    defaultCommandTimeout: 10000,
    
    // Page load timeout
    pageLoadTimeout: 30000,
    
    // Request timeout
    requestTimeout: 10000,
    
    // Response timeout
    responseTimeout: 30000,
    
    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Browser launch options
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // Custom tasks can be added here
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
