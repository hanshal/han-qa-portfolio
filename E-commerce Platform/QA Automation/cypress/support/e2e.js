// Import commands.js
import './commands'

// Global Cypress configuration
Cypress.config('scrollBehavior', 'center');

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test on uncaught exceptions
    return false;
});