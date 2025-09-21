// Base Page Object for common page functionality
class BasePage {
  constructor() {
    this.url = '';
  }

  visit() {
    cy.visit(this.url);
    this.waitForPageLoad();
  }

  waitForPageLoad() {
    cy.window().should('have.property', 'document');
  }
}

module.exports = BasePage;
