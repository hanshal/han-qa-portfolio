const LoginPage = require('../../support/pages/LoginPage');

// Test Suite: User Login Functionality
describe('Login Page Tests', () => {
  let loginPage;
  let testData;

  before(() => {
    cy.fixture('LoginData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  // Happy Path Tests
  describe('Successful Login', () => {
    // TC_LOGIN_001: Login with valid credentials
    it('Login with valid username and password', () => {
      loginPage.login(testData.validUser);
      loginPage.verifyLoginSuccess();
      
      cy.takeScreenshot('successful-login');
    });

    // TC_LOGIN_002: Verify login form structure
    it('Display login form with all required elements', () => {
      loginPage.verifyLoginFormStructure();
      
      cy.takeScreenshot('login-form-structure');
    });
  });

  // Negative Tests
  describe('Login Validation Errors', () => {
    // TC_LOGIN_003: Invalid username
    it('Display error message for invalid username', () => {
      loginPage.login(testData.invalidCredentials.invalidUsername);
      loginPage.verifyLoginError(testData.errorMessages.invalidCredentials);
      
      cy.takeScreenshot('invalid-username-error');
    });

    // TC_LOGIN_004: Invalid password
    it('Display error message for invalid password', () => {
      loginPage.login(testData.invalidCredentials.invalidPassword);
      loginPage.verifyLoginError(testData.errorMessages.invalidCredentials);
      
      cy.takeScreenshot('invalid-password-error');
    });

    // TC_LOGIN_005: Both credentials invalid
    it('Display error message for both invalid credentials', () => {
      loginPage.login(testData.invalidCredentials.bothInvalid);
      loginPage.verifyLoginError(testData.errorMessages.invalidCredentials);
      
      cy.takeScreenshot('both-invalid-credentials-error');
    });

    // TC_LOGIN_006: Empty username field
    it('Display error message for empty username', () => {
      loginPage.login(testData.emptyFields.emptyUsername);
      loginPage.verifyLoginError(testData.errorMessages.emptyFields);
      
      cy.takeScreenshot('empty-username-error');
    });

    // TC_LOGIN_007: Empty password field
    it('Display error message for empty password', () => {
      loginPage.login(testData.emptyFields.emptyPassword);
      loginPage.verifyLoginError(testData.errorMessages.emptyFields);
      
      cy.takeScreenshot('empty-password-error');
    });

    // TC_LOGIN_008: Both fields empty
    it('Display error message for both empty fields', () => {
      loginPage.login(testData.emptyFields.bothEmpty);
      loginPage.verifyLoginError(testData.errorMessages.emptyFields);
      
      cy.takeScreenshot('both-empty-fields-error');
    });
  });

  // Edge Cases
  describe('Login Edge Cases', () => {
    // TC_LOGIN_009: Special characters in username
    it('Handle special characters in username gracefully', () => {
      loginPage.login(testData.edgeCases.specialCharacters);
      loginPage.verifyLoginError(testData.errorMessages.invalidCredentials);
      
      cy.takeScreenshot('special-characters-error');
    });

    // TC_LOGIN_010: Long credentials
    it('Handle extremely long credentials', () => {
      loginPage.login(testData.edgeCases.longCredentials);
      loginPage.verifyLoginError(testData.errorMessages.invalidCredentials);
      
      cy.takeScreenshot('long-credentials-error');
    });

    // TC_LOGIN_011: Short credentials
    it('Handle very short credentials', () => {
      loginPage.login(testData.edgeCases.shortCredentials);
      loginPage.verifyLoginError(testData.errorMessages.invalidCredentials);
      
      cy.takeScreenshot('short-credentials-error');
    });
  });

  // Functionality Tests
  describe('Login Form Functionality', () => {
    // TC_LOGIN_012: Forgot password link
    it('Navigate to forgot password page', () => {
      loginPage.clickForgotPasswordLink();
      cy.url().should('include', 'account/forgotten/password');
      
      cy.takeScreenshot('forgot-password-navigation');
    });

    // TC_LOGIN_013: Forgot login link
    it('Navigate to forgot login page', () => {
      loginPage.clickForgotLoginLink();
      cy.url().should('include', 'account/forgotten/loginname');
      
      cy.takeScreenshot('forgot-login-navigation');
    });

    // TC_LOGIN_014: Clear form functionality
    it('Clear login form fields', () => {
      loginPage.fillLoginCredentials(testData.validUser);
      loginPage.clearLoginForm();
      
      cy.get(loginPage.elements.loginName).should('have.value', '');
      cy.get(loginPage.elements.password).should('have.value', '');
      
      cy.takeScreenshot('cleared-form');
    });
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});