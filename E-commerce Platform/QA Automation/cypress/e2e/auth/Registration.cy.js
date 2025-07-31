const RegistrationPage = require('../../support/pages/RegistrationPage');

describe('Registration Page Tests', () => {
  let registrationPage;
  let testData;

  before(() => {
    // Load test data from fixtures
    cy.fixture('RegistrationData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    registrationPage = new RegistrationPage();
    registrationPage.visit();
  });

  describe('Successful Registration', () => {
    it('should register a new user with valid complete data', () => {
      // Generate unique data for this test run
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

        // Complete registration process
        registrationPage.completeRegistration(userData);
        
        // Verify successful registration
        registrationPage.verifyRegistrationSuccess();
      });
    });

    it('should register a new user with minimal required data', () => {
      // Generate unique data for minimal user
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

        // Complete registration with minimal data
        registrationPage.completeRegistration(userData);

        // Verify successful registration
        registrationPage.verifyRegistrationSuccess();
      });
    });
  });

  describe('Validation Errors', () => {
    it('should display error messages for all missing required fields', () => {
      // Submit form without filling any required fields
      registrationPage.submitForm();
      
      // Verify all required field error messages using test data
      registrationPage.verifyRequiredFieldErrors(testData.errorMessages.requiredFields);
      
      // Verify Privacy Policy error using test data
      registrationPage.verifyPrivacyPolicyError(testData.errorMessages.requiredFields.privacyPolicy);
      
      // Verify form groups have error styling
      registrationPage.verifyFormGroupErrors();
      
      // Take screenshot for documentation
      cy.takeScreenshot('validation-errors-all-fields');
    });

    it('should display error message when passwords do not match', () => {
      // Generate unique data
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
            confirmPassword: 'DifferentPassword123!' // Intentionally different
          },
          newsletter: false
        };
        
        // Complete registration with mismatched passwords
        registrationPage.completeRegistration(userData);
        
        // Verify password mismatch error using test data
        registrationPage.verifyPasswordMismatchError(testData.errorMessages.requiredFields.passwordMismatch);
        
        // Take screenshot for documentation
        cy.takeScreenshot('password-mismatch-error');
      });
    });
  });


  // Test cleanup - clear any test data if needed
  afterEach(() => {
    // Clear any remaining form data
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
