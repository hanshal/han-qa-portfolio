import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';

const LoginPage = require('../../support/pages/LoginPage');

let loginPage;
let testData;

// Load test data before all scenarios
Before(() => {
  cy.fixture('LoginData').then((data) => {
    testData = data;
  });
});

// Initialize login page before each scenario
Before(() => {
  loginPage = new LoginPage();
});

// Cleanup after each scenario
After(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// ============================================
// COMMON STEPS (Used across multiple scenarios)
// ============================================

// Background step
Given('I am on the login page', () => {
  loginPage.visit();
});

// Common action steps
When('I click the login button', () => {
  loginPage.submitLogin();
});

// ============================================
// TEST CASE: Successfully log in with valid credentials
// ============================================

// Given
Given('I have valid login credentials', () => {
  cy.wrap(testData.validUsers.existingUser).as('credentials');
});

// When
When('I enter my username and password', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// Then
Then('I should be successfully logged in', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.verifyLoginSuccess(credentials.username);
  });
});

Then('I should see my username displayed', () => {
  // This is already covered in verifyLoginSuccess
  cy.get('body').should('contain.text', 'Logout');
});

// ============================================
// TEST CASE: Login with non-existent username
// ============================================

// Given
Given('I have invalid username credentials', () => {
  cy.wrap(testData.invalidCredentials.invalidUsername).as('credentials');
});

// When
When('I enter the invalid username and valid password', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// Then
Then('I should see an error message for invalid credentials', () => {
  loginPage.verifyLoginFailure(testData.errorMessages.invalidCredentials);
});

// ============================================
// TEST CASE: Login with incorrect password
// ============================================

// Given
Given('I have invalid password credentials', () => {
  cy.wrap(testData.invalidCredentials.invalidPassword).as('credentials');
});

// When
When('I enter valid username and invalid password', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// ============================================
// TEST CASE: Login with both invalid credentials
// ============================================

// Given
Given('I have both invalid username and password', () => {
  cy.wrap(testData.invalidCredentials.bothInvalid).as('credentials');
});

// When
When('I enter the invalid username and invalid password', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// ============================================
// TEST CASE: Empty username field validation
// ============================================

// Given
Given('I have empty username and valid password', () => {
  cy.wrap(testData.emptyFields.emptyUsername).as('credentials');
});

// When
When('I enter empty username and valid password', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// Then
Then('I should see a validation error for empty username field', () => {
  loginPage.verifyEmptyFieldValidation('username', testData.errorMessages.emptyFields);
});

// ============================================
// TEST CASE: Empty password field validation
// ============================================

// Given
Given('I have valid username and empty password', () => {
  cy.wrap(testData.emptyFields.emptyPassword).as('credentials');
});

// When
When('I enter valid username and empty password', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// Then
Then('I should see a validation error for empty password field', () => {
  loginPage.verifyEmptyFieldValidation('password', testData.errorMessages.emptyFields);
});

// ============================================
// TEST CASE: Both fields empty validation
// ============================================

// Given
Given('I have both username and password empty', () => {
  cy.wrap(testData.emptyFields.bothEmpty).as('credentials');
});

// When
When('I leave both fields empty', () => {
  cy.get('@credentials').then((credentials) => {
    loginPage.fillLoginCredentials(credentials.username, credentials.password);
  });
});

// Then
Then('I should see validation errors for both empty fields', () => {
  loginPage.verifyBothFieldsEmptyValidation(testData.errorMessages.emptyFields);
});

// ============================================
// TEST CASE: Navigate to password recovery page
// ============================================

// When
When('I click the forgot password link', () => {
  loginPage.clickForgotPasswordLink();
});

// Then
Then('I should be redirected to the password recovery page', () => {
  cy.url().should('include', testData.recoveryLinks.forgotPassword);
});

Then('I should see the password recovery form', () => {
  cy.get('h1, h2').should('contain.text', 'Forgot Your Password?');
});

// ============================================
// TEST CASE: Navigate to login recovery page
// ============================================

// When
When('I click the forgot login link', () => {
  loginPage.clickForgotLoginLink();
});

// Then
Then('I should be redirected to the login recovery page', () => {
  cy.url().should('include', testData.recoveryLinks.forgotLogin);
});

Then('I should see the login recovery form', () => {
  cy.get('h1, h2').should('contain.text', 'Forgot Your Login Name?');
});