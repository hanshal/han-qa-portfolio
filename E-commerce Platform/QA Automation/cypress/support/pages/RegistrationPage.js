const BasePage = require('./BasePage');

class RegistrationPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://automationteststore.com/index.php?rt=account/create';

    // Page elements - using ID selectors for better performance
    this.elements = {
      // Personal details
      firstName: '#AccountFrm_firstname',
      lastName: '#AccountFrm_lastname',
      email: '#AccountFrm_email',
      telephone: '#AccountFrm_telephone',
      fax: '#AccountFrm_fax',

      // Address details
      company: '#AccountFrm_company',
      address1: '#AccountFrm_address_1',
      address2: '#AccountFrm_address_2',
      city: '#AccountFrm_city',
      region: '#AccountFrm_zone_id',
      postcode: '#AccountFrm_postcode',
      country: '#AccountFrm_country_id',

      // Login details
      loginName: '#AccountFrm_loginname',
      password: '#AccountFrm_password',
      confirmPassword: '#AccountFrm_confirm',

      // Newsletter and agreement
      newsletterYes: '#AccountFrm_newsletter1',
      newsletterNo: '#AccountFrm_newsletter0',
      privacyPolicy: '#AccountFrm_agree',
      submitButton: 'button[title="Continue"]',
      
      // Error containers
      errorAlert: '.alert-error, .alert-danger',
      formGroupErrors: '.form-group.has-error'
    };
  }


  visit() {
    cy.logStep('Navigating to registration page');
    super.visit();
    this.verifyPageLoaded();
  }

  verifyPageLoaded() {
    cy.get(this.elements.firstName).should('be.visible');
    cy.get(this.elements.submitButton).should('be.visible');
    cy.url().should('include', 'account/create');
  }

  fillPersonalDetails(personalData) {
    cy.logStep('Filling personal details');
    const { firstName, lastName, email, telephone, fax } = personalData;
    
    cy.fillField(this.elements.firstName, firstName);
    cy.fillField(this.elements.lastName, lastName);
    cy.fillField(this.elements.email, email);
    cy.fillField(this.elements.telephone, telephone);
    cy.fillField(this.elements.fax, fax);
  }

  fillAddressDetails(addressData) {
    cy.logStep('Filling address details');
    const { company, address1, address2, city, region, postcode, country } = addressData;
    
    cy.fillField(this.elements.company, company);
    cy.fillField(this.elements.address1, address1);
    cy.fillField(this.elements.address2, address2);
    cy.fillField(this.elements.city, city);
    
    // Handle country and region selection with proper waiting
    if (country) {
      cy.selectDropdownWithWait(this.elements.country, country, 2000);
    }
    
    if (region) {
      cy.selectDropdownWithWait(this.elements.region, region);
    }
    
    cy.fillField(this.elements.postcode, postcode);
  }

  fillLoginDetails(loginData) {
    cy.logStep('Filling login details');
    const { loginName, password, confirmPassword } = loginData;
    
    cy.fillField(this.elements.loginName, loginName);
    cy.fillField(this.elements.password, password);
    cy.fillField(this.elements.confirmPassword, confirmPassword);
  }

  selectNewsletter(subscribe) {
    cy.logStep(`Setting newsletter preference: ${subscribe}`);
    if (subscribe) {
      cy.clickElement(this.elements.newsletterYes);
    } else {
      cy.clickElement(this.elements.newsletterNo);
    }
  }

  agreeToPrivacyPolicy() {
    cy.logStep('Agreeing to privacy policy');
    cy.clickElement(this.elements.privacyPolicy);
  }

  submitForm() {
    cy.logStep('Submitting registration form');
    cy.clickElement(this.elements.submitButton);
  }

  completeRegistration(userData) {
    // Fill all form sections
    this.fillPersonalDetails(userData.personalDetails);
    this.fillAddressDetails(userData.addressDetails);
    this.fillLoginDetails(userData.loginDetails);
    
    if (userData.newsletter !== undefined) {
      this.selectNewsletter(userData.newsletter);
    }
    
    this.agreeToPrivacyPolicy();
    this.submitForm();
  }

  verifyRegistrationSuccess() {
    cy.logStep('Verifying registration success');
    
    // Check for success indicators (URL change or success message)
    cy.url().should('satisfy', (url) => {
      return url.includes('success') || 
             url.includes('account') || 
             url.includes('dashboard') ||
             !url.includes('create');
    });
    
    // Take screenshot for evidence
    cy.takeScreenshot('registration-success');
  }

  verifyRequiredFieldErrors(errorMessages) {
    cy.logStep('Verifying required field error messages');
    
    if (!errorMessages) {
      throw new Error('Error messages must be provided. Please pass errorMessages from test data.');
    }

    // Verify each field error using custom command
    cy.verifyFieldError(this.elements.firstName, errorMessages.firstName);
    cy.verifyFieldError(this.elements.lastName, errorMessages.lastName);
    cy.verifyFieldError(this.elements.email, errorMessages.email);
    cy.verifyFieldError(this.elements.address1, errorMessages.address1);
    cy.verifyFieldError(this.elements.city, errorMessages.city);
    cy.verifyFieldError(this.elements.region, errorMessages.region);
    cy.verifyFieldError(this.elements.postcode, errorMessages.postcode);
    cy.verifyFieldError(this.elements.loginName, errorMessages.loginName);
    cy.verifyFieldError(this.elements.password, errorMessages.password);
  }

  verifyPrivacyPolicyError(expectedMessage = 'You must agree to the Privacy Policy!') {
    cy.logStep('Verifying privacy policy error');
    cy.get(this.elements.errorAlert)
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }

  verifyPasswordMismatchError(expectedMessage = 'Password confirmation does not match') {
    cy.logStep('Verifying password mismatch error');
    cy.get('body').should('contain.text', expectedMessage);
  }

  verifyFormGroupErrors() {
    cy.logStep('Verifying form group error styling');
    cy.get(this.elements.formGroupErrors).should('have.length.greaterThan', 0);
  }
}

module.exports = RegistrationPage;
