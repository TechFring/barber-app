/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';
import { mockDate, mockProductName } from '../mocks';

describe('Logs', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.get('.p-ripple').click();
    cy.get('.sidebar-list > :nth-child(6) > .sidebar-link').click();
  });

  describe('Filtro', () => {
    const description = mockProductName();
    const createdAt = mockDate();
    const formattedDate = createdAt.split('/').reverse().join('-');

    it('Deve buscar logs utilizando os filtros', () => {
      cy.get('[data-test="description"]').type(description);
      cy.get('[data-test="created_at"]').type(`${createdAt}{esc}`);
      cy.intercept('GET', `${API_URL}/log?*`).as('request');
      cy.get('.actions > [styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.query.description).to.equal(description);
        expect(interception.request.query.created_at).to.equal(formattedDate);
        expect(interception.request.query.page).to.equal('1');
        expect(interception.request.query.per_page).to.equal('5');
      });
    });
  });
});