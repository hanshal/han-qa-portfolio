const RegistrationPage = require('../../support/pages/RegistrationPage');

// Test Suite: User Registration Functionality
describe('Registration Page Tests', () => {
  let registrationPage;
  let testData;

  before(() => {
    cy.fixture('RegistrationData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    registrationPage = new RegistrationPage();
    registrationPage.visit();
  });

  // Happy Path Tests
  describe('Successful Registration', () => {

    // TC_REG_001: Complete registration with all fields
    it('Successfully register a new user with valid complete data', () => {
      cy.generateUniqueUserData(
        testData.validUser.personalDetails.email,
        testData.validUser.loginDetails.loginName
      ).then((uniqueData) => {
        
        const userData = {
          personalDetails: {
            ...testData.validUser.personalDetails,
            email: uniqueData.email
          },
          addressDetails: testData.validUser.addressDetails,
          loginDetails: {
            ...testData.validUser.loginDetails,
            loginName: uniqueData.loginName
          },
          newsletter: testData.validUser.newsletter
        };

        registrationPage.completeRegistration(userData);
        registrationPage.verifyRegistrationSuccess();
      });
    });

    // TC_REG_002: Minimal data registration
    it('Successfully register a new user with minimal required data', () => {
      cy.generateUniqueUserData(
        testData.minimalValidUser.personalDetails.email,
        testData.minimalValidUser.loginDetails.loginName
      ).then((uniqueData) => {
        const userData = {
          ...testData.minimalValidUser,
          personalDetails: {
            ...testData.minimalValidUser.personalDetails,
            email: uniqueData.email
          },
          loginDetails: {
            ...testData.minimalValidUser.loginDetails,
            loginName: uniqueData.loginName
          }
        };

        registrationPage.completeRegistration(userData);
        registrationPage.verifyRegistrationSuccess();
      });
    });
  });

  // Form Validation Tests
  describe('Form Validation', () => {
    
    // TC_REG_003: Required field validation
    it('Show validation errors for all missing required fields', () => {
      registrationPage.submitForm();
      
      registrationPage.verifyRequiredFieldErrors(testData.errorMessages.requiredFields);
      registrationPage.verifyPrivacyPolicyError(testData.errorMessages.requiredFields.privacyPolicy);
      registrationPage.verifyFormGroupErrors();
    });

    // TC_REG_004: Password mismatch validation
    it('Show validation error when passwords do not match', () => {
      cy.generateUniqueUserData(
        testData.validUser.personalDetails.email,
        testData.validUser.loginDetails.loginName
      ).then((uniqueData) => {
        const userData = {
          personalDetails: {
            ...testData.validUser.personalDetails,
            email: uniqueData.email
          },
          addressDetails: testData.validUser.addressDetails,
          loginDetails: {
            ...testData.validUser.loginDetails,
            loginName: uniqueData.loginName,
            confirmPassword: 'DifferentPassword123!'
          },
          newsletter: false
        };
        
        registrationPage.completeRegistration(userData);
        registrationPage.verifyPasswordMismatchError(testData.errorMessages.requiredFields.passwordMismatch);
      });
    });
  });

  // Duplicate Data Prevention Tests
  describe('Registration with Existing Data', () => {
    
    // TC_REG_005: Duplicate email prevention
    it('Display error message for existing email address', () => {
      cy.generateUniqueUserData(
        testData.validUser.personalDetails.email,
        testData.validUser.loginDetails.loginName
      ).then((uniqueData) => {
        const userData = {
          personalDetails: {
            ...testData.validUser.personalDetails,
            email: testData.existingUser.email
          },
          addressDetails: testData.validUser.addressDetails,
          loginDetails: {
            ...testData.validUser.loginDetails,
            loginName: uniqueData.loginName
          },
          newsletter: false
        };
        
        registrationPage.completeRegistration(userData);
        registrationPage.verifyExistingEmailError(testData.errorMessages.existingData.existingEmail);
      });
    });

    // TC_REG_006: Duplicate username prevention
    it('Display error message for existing username', () => {
      cy.generateUniqueUserData(
        testData.validUser.personalDetails.email,
        testData.validUser.loginDetails.loginName
      ).then((uniqueData) => {
        const userData = {
          personalDetails: {
            ...testData.validUser.personalDetails,
            email: uniqueData.email
          },
          addressDetails: testData.validUser.addressDetails,
          loginDetails: {
            ...testData.validUser.loginDetails,
            loginName: testData.existingUser.loginName
          },
          newsletter: false
        };
        
        registrationPage.completeRegistration(userData);
        registrationPage.verifyExistingUsernameError(testData.errorMessages.existingData.existingUsername);
      });
    });
  });

  // Cleanup after each test
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
