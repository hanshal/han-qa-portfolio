Feature: User Login Functionality
  As a registered user
  I want to log into the e-commerce platform
  So that I can access my account and make purchases

  Background:
    Given I am on the login page

  @login @happy-path
  Scenario: Successfully log in with valid credentials
    Given I have valid login credentials
    When I enter my username and password
    And I click the login button
    Then I should be successfully logged in
    And I should see my username displayed

  @login @invalid-credentials
  Scenario: Login with non-existent username
    Given I have invalid username credentials
    When I enter the invalid username and valid password
    And I click the login button
    Then I should see an error message for invalid credentials

  @login @invalid-credentials
  Scenario: Login with incorrect password
    Given I have invalid password credentials
    When I enter valid username and invalid password
    And I click the login button
    Then I should see an error message for invalid credentials

  @login @invalid-credentials
  Scenario: Login with both invalid credentials
    Given I have both invalid username and password
    When I enter the invalid username and invalid password
    And I click the login button
    Then I should see an error message for invalid credentials

  @login @form-validation
  Scenario: Empty username field validation
    Given I have empty username and valid password
    When I enter empty username and valid password
    And I click the login button
    Then I should see a validation error for empty username field

  @login @form-validation
  Scenario: Empty password field validation
    Given I have valid username and empty password
    When I enter valid username and empty password
    And I click the login button
    Then I should see a validation error for empty password field

  @login @form-validation
  Scenario: Both fields empty validation
    Given I have both username and password empty
    When I leave both fields empty
    And I click the login button
    Then I should see validation errors for both empty fields

  @login @navigation
  Scenario: Navigate to password recovery page
    When I click the forgot password link
    Then I should be redirected to the password recovery page
    And I should see the password recovery form

  @login @navigation
  Scenario: Navigate to login recovery page
    When I click the forgot login link
    Then I should be redirected to the login recovery page
    And I should see the login recovery form