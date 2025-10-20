Feature: E-commerce Purchase Workflow
  As a registered customer
  I want to complete a full purchase workflow
  So that I can buy products from the e-commerce platform

  Background:
    Given I am on the purchase workflow login page
    And I have valid login credentials for purchase workflow

  @e2e @purchase @workflow
  Scenario: Complete E2E purchase workflow with dynamic cheapest fragrance selection
    Given I login with existing user credentials for purchase workflow
    When I navigate to the home page
    And I clear any existing cart items
    And I navigate to Men's Fragrance Sets section
    Then I should see the fragrance sets page

    When I find and select the cheapest available fragrance
    Then I should see the product details page
    And the product price should be displayed correctly

    When I add the product to cart
    Then the product should be added to cart successfully
    And I should see the correct product and price in cart

    When I update the cart quantity to 2
    Then the cart should show quantity as 2
    And the total price should be updated for 2 items

    When I verify the shipping calculation
    Then the shipping cost should be calculated correctly
    And the final total should include shipping

    Then I should be ready to proceed to checkout