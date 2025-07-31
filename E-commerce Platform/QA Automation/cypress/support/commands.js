
Cypress.Commands.add('generateUniqueUserData', (baseEmail, baseLoginName) => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  
  return {
    email: baseEmail.replace('{{timestamp}}', `${timestamp}.${randomSuffix}`),
    loginName: baseLoginName.replace('{{timestamp}}', `${timestamp}${randomSuffix}`)
  };
});

Cypress.Commands.add('clickElement', (selector) => {
  cy.get(selector).should('be.visible').click();
});

Cypress.Commands.add('selectDropdownWithWait', (selector, value, waitTime = 1000) => {
  cy.get(selector).select(value);
  cy.wait(waitTime);
});

Cypress.Commands.add('fillField', (selector, value, clearFirst = true) => {
  if (value !== '' && value !== null && value !== undefined) {
    const field = cy.get(selector).should('be.visible');
    if (clearFirst) {
      field.clear();
    }
    field.type(value);
  }
});

Cypress.Commands.add('verifyFieldError', (fieldSelector, expectedMessage) => {
  cy.get(fieldSelector)
    .parent()
    .parent()
    .find('.help-block')
    .should('be.visible')
    .and('contain.text', expectedMessage);
});

Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { 
    capture: 'viewport',
    onAfterScreenshot: (el, props) => {
      console.log(`Screenshot taken: ${props.path}`);
    }
  });
});

Cypress.Commands.add('logStep', (step) => {
  cy.log(`🔸 ${step}`);
  cy.task('log', `Step: ${step}`, { log: false });
});
