const PurchaseWorkflowPage = require('../../support/pages/PurchaseWorkflowPage');
const LoginPage = require('../../support/pages/LoginPage');

// Test Suite: Complete E-commerce Purchase Workflow
describe('Purchase Workflow Tests', () => {
  let purchaseWorkflowPage;
  let loginPage;
  let loginData;

  before(() => {
    cy.fixture('LoginData').then((data) => {
      loginData = data;
    });
  });

  beforeEach(() => {
    purchaseWorkflowPage = new PurchaseWorkflowPage();
    loginPage = new LoginPage();
  });

  // Single Complete E2E Test Case
  // TC_WORKFLOW_001: Complete E2E purchase workflow with dynamic cheapest fragrance selection
  it('TC_WORKFLOW_001: Complete E2E purchase workflow with dynamic cheapest fragrance selection', () => {
    const { username, password } = loginData.validUsers.existingUser;
    
    // Step 1: Login with existing user (using existing LoginPage functionality)
    loginPage.visit();
    loginPage.login(username, password);
    loginPage.verifyLoginSuccess(username);
    
    // Step 1.5: Clear any existing cart items
    purchaseWorkflowPage.clearCart();
    
    // Step 2: Navigate to Men's Fragrance Sets
    purchaseWorkflowPage.navigateToMensFragranceSets();
    purchaseWorkflowPage.verifyFragranceSetsPage();
    
    // Step 3: Find and select the cheapest available fragrance dynamically
    purchaseWorkflowPage.findAndSelectCheapestFragrance();
    
    // Step 4: Verify displayed price on product page
    purchaseWorkflowPage.verifyProductPagePrice();
    
    // Step 5: Add product to cart
    purchaseWorkflowPage.addProductToCart();
    
    // Step 6: Verify cart contents and price
    purchaseWorkflowPage.verifyCartContentsAndPrice();
    
    // Step 7: Update quantity to 2
    purchaseWorkflowPage.updateCartQuantity(2);
    
    // Step 8: Verify price is updated accordingly for quantity 2
    purchaseWorkflowPage.verifyUpdatedCartPricing();
    
    // Step 9: Verify shipping calculation with updated total
    purchaseWorkflowPage.verifyShippingCalculationWithUpdatedTotal();
    
    // Step 10: Verify ready to proceed to checkout
    purchaseWorkflowPage.verifyReadyForCheckout();
  });

  // Cleanup after test
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});