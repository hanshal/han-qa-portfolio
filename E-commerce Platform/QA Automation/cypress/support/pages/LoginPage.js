const BasePage = require('./BasePage');

// Page Object for User Login functionality
class LoginPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = 'https://automationteststore.com/';
    this.url = this.baseUrl;

    // Page element selectors
    this.elements = {
      // Navigation elements
      loginRegisterButton: '#customernav a[href*="account/login"]',

      // Login form elements
      loginForm: '#loginFrm',
      loginNameOrEmail: '#loginFrm_loginname',
      password: '#loginFrm_password',
      loginButton: '#loginFrm button[title="Login"]',
      
      // Links within login form
      forgotPasswordLink: 'a[href*="account/forgotten/password"]',
      forgotLoginLink: 'a[href*="account/forgotten/loginname"]',

      // Error elements
      errorAlert: '.alert-error, .alert-danger',
      formGroup: '.form-group',
      helpBlock: '.help-block'
    };
  }

  // Visit homepage and navigate to login page
  visit() {
    cy.logStep('Starting login flow from home page');
    super.visit();
    this.navigateToLoginPage();
  }

  // Navigate through UI flow to reach login form
  navigateToLoginPage() {
    cy.logStep('Navigating to login page through proper flow');
    
    // Step 1: Click on "Login or register" button
    cy.logStep('Clicking on Login or register button');
    cy.get(this.elements.loginRegisterButton)
      .should('be.visible')
      .click();
    
    // Verify we're on the login page
    cy.url().should('include', 'account/login');
  }

  // Complete login process with provided credentials
  login(username, password) {
    this.fillLoginCredentials(username, password);
    this.submitLogin();
  }

  // Fill login credentials and submit form
  fillLoginCredentials(username, password) {
    cy.logStep(`Filling login credentials for user: ${username}`);
    cy.fillField(this.elements.loginNameOrEmail, username);
    cy.fillField(this.elements.password, password);
  }

  // Submit the login form
  submitLogin() {
    cy.logStep('Submitting login form');
    cy.clickElement(this.elements.loginButton);
  }

  // Verify successful login by checking various indicators
  verifyLoginSuccess(expectedUsername = null) {
    cy.logStep('Verifying successful login');
    
    // Check URL change - should not be on login page anymore
    cy.url().should('not.include', 'account/login');
    
    // Check for account dashboard or success indicators
    cy.url().should('satisfy', (url) => {
      return url.includes('account') || 
             url.includes('dashboard') || 
             url.includes('index') ||
             !url.includes('login');
    });

    // Look for logout link as indicator of successful login
    cy.get('body').should('contain.text', 'Logout');
    
    cy.takeScreenshot('login-success');
  }



  // Core method to verify login errors with customizable parameters
  // Handles all error scenarios: invalid credentials, empty fields, etc.
  verifyLoginError(screenshotName = 'login-error', expectedErrorMessage = 'Error: Incorrect login or password provided.', logMessage = 'Verifying login error') {
    cy.logStep(logMessage);
    
    // Should remain on login page
    cy.url().should('include', 'account/login');
    
    // Check for error message
    cy.get(this.elements.errorAlert)
      .should('be.visible')
      .and('contain.text', expectedErrorMessage);
    
    cy.takeScreenshot(screenshotName);
  }

  // Verify login failure with invalid credentials
  verifyLoginFailure(expectedErrorMessage = 'Error: Incorrect login or password provided.') {
    this.verifyLoginError('login-failure', expectedErrorMessage, 'Verifying login failure');
  }

  // Verify validation errors for empty fields (username or password)
  verifyEmptyFieldValidation(fieldType, expectedErrorMessage = 'Error: Incorrect login or password provided.') {
    this.verifyLoginError(`empty-${fieldType}-validation`, expectedErrorMessage, `Verifying validation for empty ${fieldType} field`);
  }

  // Verify validation errors when both username and password fields are empty
  verifyBothFieldsEmptyValidation(expectedErrorMessage = 'Error: Incorrect login or password provided.') {
    this.verifyLoginError('both-fields-empty-validation', expectedErrorMessage, 'Verifying validation for both empty fields');
  }

  // Navigation methods
  clickForgotPasswordLink() {
    cy.logStep('Clicking forgot password link');
    cy.get(this.elements.forgotPasswordLink)
      .should('be.visible')
      .and('contain.text', 'Forgot your password?')
      .click();
  }

  clickForgotLoginLink() {
    cy.logStep('Clicking forgot login link');
    cy.get(this.elements.forgotLoginLink)
      .should('be.visible')
      .and('contain.text', 'Forgot your login?')
      .click();
  }
}

module.exports = LoginPage;