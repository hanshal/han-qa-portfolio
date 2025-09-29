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

    // TC_LOGIN_001: Valid login with existing username
    it('Successfully log in with valid username and password', () => {
      const { username, password } = testData.validUsers.existingUser;
      
      loginPage.login(username, password);
      loginPage.verifyLoginSuccess(username);
    });
  });
  
  // Invalid Credentials
  describe('Login with Invalid Credentials', () => {
    
    // TC_LOGIN_002: Invalid username
    it('Display error message for non-existent username', () => {
      const { username, password } = testData.invalidCredentials.invalidUsername;
      
      loginPage.login(username, password);
      loginPage.verifyLoginFailure(testData.errorMessages.invalidCredentials);
    });

    // TC_LOGIN_003: Invalid password
    it('Display error message for incorrect password', () => {
      const { username, password } = testData.invalidCredentials.invalidPassword;
      
      loginPage.login(username, password);
      loginPage.verifyLoginFailure(testData.errorMessages.invalidCredentials);
    });

    // TC_LOGIN_004: Both username and password invalid
    it('Display error message for both invalid credentials', () => {
      const { username, password } = testData.invalidCredentials.bothInvalid;
      
      loginPage.login(username, password);
      loginPage.verifyLoginFailure(testData.errorMessages.invalidCredentials);
    });
  });

  // Form Validation Tests
  describe('Form Validation', () => {
    
    // TC_LOGIN_005: Empty username field
    it('Show validation error for empty username field', () => {
      const { username, password } = testData.emptyFields.emptyUsername;
      
      loginPage.login(username, password);
      loginPage.verifyEmptyFieldValidation('username', testData.errorMessages.emptyFields);
    });

    // TC_LOGIN_006: Empty password field
    it('Show validation error for empty password field', () => {
      const { username, password } = testData.emptyFields.emptyPassword;
      
      loginPage.login(username, password);
      loginPage.verifyEmptyFieldValidation('password', testData.errorMessages.emptyFields);
    });

    // TC_LOGIN_007: Both fields empty
    it('Show validation errors for both empty fields', () => {
      const { username, password } = testData.emptyFields.bothEmpty;
      
      loginPage.login(username, password);
      loginPage.verifyBothFieldsEmptyValidation(testData.errorMessages.emptyFields);
    });
  });

  // Navigation Link Tests
  describe('Navigation Links', () => {
    
    // TC_LOGIN_008: Password recovery link functionality
    it('Navigate to password recovery when forgot password link is clicked', () => {
      loginPage.clickForgotPasswordLink();
      
      cy.url().should('include', testData.recoveryLinks.forgotPassword);
      cy.get('h1, h2').should('contain.text', 'Forgot Your Password?');
    });

    // TC_LOGIN_009: Login recovery link functionality  
    it('Navigate to login recovery when forgot login link is clicked', () => {
      loginPage.clickForgotLoginLink();
      
      cy.url().should('include', testData.recoveryLinks.forgotLogin);
      cy.get('h1, h2').should('contain.text', 'Forgot Your Login Name?');
    });
  });

  // Cleanup after each test
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});