
// Custom Cypress Commands

// Generates unique user data with timestamp to prevent conflicts
Cypress.Commands.add('generateUniqueUserData', (baseEmail, baseLoginName) => {
  // Input validation
  if (!baseEmail || !baseLoginName) {
    throw new Error('Both baseEmail and baseLoginName parameters are required');
  }
  
  if (!baseEmail.includes('{{timestamp}}') || !baseLoginName.includes('{{timestamp}}')) {
    throw new Error('Base email and login name must contain {{timestamp}} placeholder');
  }
  
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  
  return {
    email: baseEmail.replace('{{timestamp}}', `${timestamp}.${randomSuffix}`),
    loginName: baseLoginName.replace('{{timestamp}}', `${timestamp}${randomSuffix}`)
  };
});

// Clicks an element with visibility validation
Cypress.Commands.add('clickElement', (selector) => {
  cy.get(selector).should('be.visible').click();
});

// Selects dropdown option with configurable wait time
Cypress.Commands.add('selectDropdownWithWait', (selector, value, waitTime = 1000) => {
  cy.get(selector)
    .should('be.visible')
    .select(value)
  cy.wait(waitTime);
});

// Fills input field with validation and optional clearing
Cypress.Commands.add('fillField', (selector, value, clearFirst = true) => {
  // Only proceed if value is provided and not empty
  if (value !== '' && value !== null && value !== undefined) {
    cy.get(selector)
      .should('be.visible')
      .should('not.be.disabled')
      .then(($field) => {
        if (clearFirst) {
          cy.wrap($field).clear();
        }
        cy.wrap($field).type(value, { delay: 50 });
      });
  }
});

// Verifies field-specific error messages in form validation
Cypress.Commands.add('verifyFieldError', (fieldSelector, expectedMessage) => {
  // More robust error message detection - checks multiple possible locations
  cy.get(fieldSelector)
    .closest('.form-group')
    .within(() => {
      cy.get('.help-block, .text-danger, .error-message, [class*="error"]')
        .should('be.visible')
        .and('contain.text', expectedMessage);
    });
});

// Captures screenshot with logging for test evidence
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { 
    capture: 'viewport',
    onAfterScreenshot: (el, props) => {
      console.log(`Screenshot taken: ${props.path}`);
    }
  });
});

// Logs test steps with consistent formatting
Cypress.Commands.add('logStep', (step) => {
  cy.log(`🔸 ${step}`);
  cy.task('log', `Step: ${step}`, { log: false });
});
