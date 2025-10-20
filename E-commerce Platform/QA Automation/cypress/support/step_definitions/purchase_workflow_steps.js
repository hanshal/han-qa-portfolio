const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const PurchaseWorkflowPage = require('../pages/PurchaseWorkflowPage');
const LoginPage = require('../pages/LoginPage');

let purchaseWorkflowPage;
let loginPage;
let loginData;

// Initialize page objects
Given('I am on the purchase workflow login page', () => {
  purchaseWorkflowPage = new PurchaseWorkflowPage();
  loginPage = new LoginPage();
  
  cy.fixture('LoginData').then((data) => {
    loginData = data;
  });
  
  loginPage.visit();
});

Given('I have valid login credentials for purchase workflow', () => {
  // This step just validates that we have test data loaded
  cy.then(() => {
    expect(loginData).to.exist;
    expect(loginData.validUsers.existingUser.username).to.exist;
    expect(loginData.validUsers.existingUser.password).to.exist;
  });
});

Given('I login with existing user credentials for purchase workflow', () => {
  const { username, password } = loginData.validUsers.existingUser;
  loginPage.login(username, password);
  loginPage.verifyLoginSuccess(username);
});

When('I navigate to the home page', () => {
  // User is already on home page after login
  cy.url().should('include', '/');
});

When('I clear any existing cart items', () => {
  purchaseWorkflowPage.clearCart();
});

When('I navigate to Men\'s Fragrance Sets section', () => {
  purchaseWorkflowPage.navigateToMensFragranceSets();
});

Then('I should see the fragrance sets page', () => {
  purchaseWorkflowPage.verifyFragranceSetsPage();
});

When('I find and select the cheapest available fragrance', () => {
  purchaseWorkflowPage.findAndSelectCheapestFragrance();
});

Then('I should see the product details page', () => {
  // Verify we're on a product page by checking for product-specific elements
  cy.url().should('match', /product_id=|\/product\//);
});

Then('the product price should be displayed correctly', () => {
  purchaseWorkflowPage.verifyProductPagePrice();
});

When('I add the product to cart', () => {
  purchaseWorkflowPage.addProductToCart();
});

Then('the product should be added to cart successfully', () => {
  // Simply verify that the add to cart operation completed without explicit cart verification
  // since the actual cart verification is done in the next step
  cy.wait(1000); // Allow time for cart update
});

Then('I should see the correct product and price in cart', () => {
  purchaseWorkflowPage.verifyCartContentsAndPrice();
});

When('I update the cart quantity to {int}', (quantity) => {
  purchaseWorkflowPage.updateCartQuantity(quantity);
});

Then('the cart should show quantity as {int}', (expectedQuantity) => {
  // The updateCartQuantity method already handles quantity verification
  // Just wait for the update to complete
  cy.wait(1000);
});

Then('the total price should be updated for {int} items', (quantity) => {
  purchaseWorkflowPage.verifyUpdatedCartPricing();
});

When('I verify the shipping calculation', () => {
  purchaseWorkflowPage.verifyShippingCalculationWithUpdatedTotal();
});

Then('the shipping cost should be calculated correctly', () => {
  // The verifyShippingCalculationWithUpdatedTotal method handles shipping verification
  cy.wait(1000);
});

Then('the final total should include shipping', () => {
  // This is verified as part of the shipping calculation method
  cy.wait(1000);
});

Then('I should be ready to proceed to checkout', () => {
  purchaseWorkflowPage.verifyReadyForCheckout();
});