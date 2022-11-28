// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test-id attribute.
     * @example cy.testId('greeting')
     * @example cy.testId([greeting, name])
     */
    testId(...id: string[]): Chainable<Element>
  }
}