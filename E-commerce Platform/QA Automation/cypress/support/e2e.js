// Cypress E2E Support Configuration

import './commands'

// Global configuration
Cypress.config('scrollBehavior', 'center');

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});