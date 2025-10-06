Feature: User Registration Functionality
  As a new user
  I want to register on the e-commerce platform
  So that I can create an account and make purchases

  Background:
    Given I am on the registration page

  @registration @happy-path
  Scenario: Successfully register with complete valid data
    Given I have complete valid registration data
    When I fill in all required personal details
    And I fill in address details
    And I fill in login details with unique credentials
    And I accept the privacy policy
    And I click the register button
    Then I should be successfully registered
    And I should see a registration success message

  @registration @happy-path
  Scenario: Successfully register with minimal required data
    Given I have minimal valid registration data
    When I fill in only the required personal details
    And I fill in minimal login details with unique credentials
    And I accept the privacy policy
    And I click the register button
    Then I should be successfully registered
    And I should see a registration success message

  @registration @form-validation
  Scenario: Show validation errors for missing required fields
    When I submit the registration form without filling any fields
    Then I should see validation errors for all required fields
    And I should see a privacy policy acceptance error
    And I should see form group errors highlighting missing fields

  @registration @form-validation
  Scenario: Show validation error for password mismatch
    Given I have valid registration data with mismatched passwords
    When I fill in all registration details
    And I enter different passwords in password and confirm password fields
    And I accept the privacy policy
    And I click the register button
    Then I should see a password mismatch validation error

  @registration @duplicate-prevention
  Scenario: Display error for existing email address
    Given I have registration data with an existing email
    When I fill in registration details with an email that already exists
    And I fill in unique login details
    And I accept the privacy policy
    And I click the register button
    Then I should see an error message for existing email address

  @registration @duplicate-prevention
  Scenario: Display error for existing username
    Given I have registration data with an existing username
    When I fill in registration details with unique email
    And I fill in login details with a username that already exists
    And I accept the privacy policy
    And I click the register button
    Then I should see an error message for existing username