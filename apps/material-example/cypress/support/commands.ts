/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import Chainable = Cypress.Chainable;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    testId(...ids: string[]): Chainable<JQuery>;
  }
}

Cypress.Commands.add('testId', (...ids: string[]): Chainable<JQuery> => {
  return cy.get(`${ids.map(id => (`[data-test-id=${id}]`)).join(' ')}`);
});
