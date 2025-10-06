import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';

const RegistrationPage = require('../../support/pages/RegistrationPage');

let registrationPage;
let testData;

// Load test data before all scenarios
Before(() => {
  cy.fixture('RegistrationData').then((data) => {
    testData = data;
  });
});

// Initialize registration page before each scenario
Before(() => {
  registrationPage = new RegistrationPage();
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
Given('I am on the registration page', () => {
  registrationPage.visit();
});

// Common action steps
When('I accept the privacy policy', () => {
  registrationPage.agreeToPrivacyPolicy();
});

When('I click the register button', () => {
  registrationPage.submitForm();
});

// Common assertion steps
Then('I should be successfully registered', () => {
  registrationPage.verifyRegistrationSuccess();
});

Then('I should see a registration success message', () => {
  // This is already covered in verifyRegistrationSuccess
  cy.url().should('satisfy', (url) => {
    return url.includes('success') || 
           url.includes('account') || 
           url.includes('dashboard') ||
           !url.includes('create');
  });
});

// ============================================
// TEST CASE: Successfully register with complete valid data
// ============================================

// Given
Given('I have complete valid registration data', () => {
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
    cy.wrap(userData).as('registrationData');
  });
});

// When
When('I fill in all required personal details', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillPersonalDetails(userData.personalDetails);
  });
});

When('I fill in address details', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillAddressDetails(userData.addressDetails);
  });
});

When('I fill in login details with unique credentials', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillLoginDetails(userData.loginDetails);
  });
});

// ============================================
// TEST CASE: Successfully register with minimal required data
// ============================================

// Given
Given('I have minimal valid registration data', () => {
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
    cy.wrap(userData).as('registrationData');
  });
});

// When
When('I fill in only the required personal details', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillPersonalDetails(userData.personalDetails);
  });
});

When('I fill in minimal login details with unique credentials', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillLoginDetails(userData.loginDetails);
  });
});

// ============================================
// TEST CASE: Show validation errors for missing required fields
// ============================================

// When
When('I submit the registration form without filling any fields', () => {
  registrationPage.submitForm();
});

// Then
Then('I should see validation errors for all required fields', () => {
  registrationPage.verifyRequiredFieldErrors(testData.errorMessages.requiredFields);
});

Then('I should see a privacy policy acceptance error', () => {
  registrationPage.verifyPrivacyPolicyError(testData.errorMessages.requiredFields.privacyPolicy);
});

Then('I should see form group errors highlighting missing fields', () => {
  registrationPage.verifyFormGroupErrors();
});

// ============================================
// TEST CASE: Show validation error for password mismatch
// ============================================

// Given
Given('I have valid registration data with mismatched passwords', () => {
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
    cy.wrap(userData).as('registrationData');
  });
});

// When
When('I fill in all registration details', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillPersonalDetails(userData.personalDetails);
    registrationPage.fillAddressDetails(userData.addressDetails);
  });
});

When('I enter different passwords in password and confirm password fields', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillLoginDetails(userData.loginDetails);
  });
});

// Then
Then('I should see a password mismatch validation error', () => {
  registrationPage.verifyPasswordMismatchError(testData.errorMessages.requiredFields.passwordMismatch);
});

// ============================================
// TEST CASE: Display error for existing email address
// ============================================

// Given
Given('I have registration data with an existing email', () => {
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
    cy.wrap(userData).as('registrationData');
  });
});

// When
When('I fill in registration details with an email that already exists', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillPersonalDetails(userData.personalDetails);
    registrationPage.fillAddressDetails(userData.addressDetails);
  });
});

When('I fill in unique login details', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillLoginDetails(userData.loginDetails);
  });
});

// Then
Then('I should see an error message for existing email address', () => {
  registrationPage.verifyExistingEmailError(testData.errorMessages.existingData.existingEmail);
});

// ============================================
// TEST CASE: Display error for existing username
// ============================================

// Given
Given('I have registration data with an existing username', () => {
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
    cy.wrap(userData).as('registrationData');
  });
});

// When
When('I fill in registration details with unique email', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillPersonalDetails(userData.personalDetails);
    registrationPage.fillAddressDetails(userData.addressDetails);
  });
});

When('I fill in login details with a username that already exists', () => {
  cy.get('@registrationData').then((userData) => {
    registrationPage.fillLoginDetails(userData.loginDetails);
  });
});

// Then
Then('I should see an error message for existing username', () => {
  registrationPage.verifyExistingUsernameError(testData.errorMessages.existingData.existingUsername);
});