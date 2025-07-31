/**
 * Simple Base Page class for common page functionality
 * All page objects can extend this class for basic shared methods
 */
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
