const BasePage = require('./BasePage');

// Page Object for User Login functionality
class LoginPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = 'https://automationteststore.com/';
    this.url = this.baseUrl + 'index.php?rt=account/login';

    // Page element selectors aligned with actual HTML structure
    this.elements = {
      // Login form container
      returningCustomerSection: '.col-sm-6.returncustomer',
      loginForm: '#loginFrm',
      
      // Form fields
      loginName: '#loginFrm_loginname',
      password: '#loginFrm_password',
      
      // Action buttons and links
      loginButton: '#loginFrm button[title="Login"]',
      forgotPasswordLink: 'a[href*="account/forgotten/password"]',
      forgotLoginLink: 'a[href*="account/forgotten/loginname"]',
      
      // Error containers
      errorAlert: '.alert-error, .alert-danger',
      formGroupErrors: '.form-group.has-error',
      helpBlock: '.help-block'
    };
  }

  // Navigate to login page
  visit() {
    cy.logStep('Navigating to login page');
    cy.visit(this.url);
    this.verifyPageLoaded();
  }

  // Verify that login page has loaded correctly
  verifyPageLoaded() {
    cy.logStep('Verifying login page loaded');
    cy.get(this.elements.loginForm).should('be.visible');
    cy.get(this.elements.loginName).should('be.visible');
    cy.get(this.elements.password).should('be.visible');
    cy.get(this.elements.loginButton).should('be.visible');
  }

  // Verify complete login form structure
  verifyLoginFormStructure() {
    cy.logStep('Verifying complete login form structure');
    
    // Check returning customer section
    cy.get(this.elements.returningCustomerSection).should('be.visible');
    
    // Check form labels
    cy.get('body').should('contain.text', 'Login Name:');
    cy.get('body').should('contain.text', 'Password:');
    
    // Check forgot links
    cy.get(this.elements.forgotPasswordLink).should('be.visible');
    cy.get(this.elements.forgotLoginLink).should('be.visible');
    
    // Check form structure
    cy.get(this.elements.loginForm).should('be.visible');
  }

  // Fill login credentials
  fillLoginCredentials(loginData) {
    cy.logStep('Filling login credentials');
    const { loginName, password } = loginData;
    
    if (loginName) {
      cy.fillField(this.elements.loginName, loginName);
    }
    if (password) {
      cy.fillField(this.elements.password, password);
    }
  }

  // Click login button
  clickLoginButton() {
    cy.logStep('Clicking login button');
    cy.clickElement(this.elements.loginButton);
  }

  // Complete login process
  login(loginData) {
    cy.logStep('Performing login with provided credentials');
    this.fillLoginCredentials(loginData);
    this.clickLoginButton();
  }

  // Verify successful login (user should be redirected to account page)
  verifyLoginSuccess() {
    cy.logStep('Verifying successful login');
    cy.url().should('include', 'account/account');
    cy.get('body').should('contain.text', 'My Account');
  }

  // Verify login error message
  verifyLoginError(expectedMessage = 'Error: Incorrect login or password provided.') {
    cy.logStep('Verifying login error message');
    cy.get(this.elements.errorAlert)
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }

  // Verify required field errors
  verifyRequiredFieldErrors() {
    cy.logStep('Verifying required field errors');
    cy.get(this.elements.errorAlert).should('be.visible');
  }

  // Clear login form
  clearLoginForm() {
    cy.logStep('Clearing login form');
    cy.get(this.elements.loginName).clear();
    cy.get(this.elements.password).clear();
  }

  // Click forgot password link
  clickForgotPasswordLink() {
    cy.logStep('Clicking forgot password link');
    cy.clickElement(this.elements.forgotPasswordLink);
  }

  // Click forgot login link
  clickForgotLoginLink() {
    cy.logStep('Clicking forgot login link');
    cy.clickElement(this.elements.forgotLoginLink);
  }
}

module.exports = LoginPage;