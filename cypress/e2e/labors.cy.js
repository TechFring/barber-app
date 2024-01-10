/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';
import { mockProductName, randomNumber } from '../mocks';

describe('Labors', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.get('.p-ripple').click();
    cy.get('.sidebar-list > :nth-child(4) > .sidebar-link').click();
  });

  describe('Filtro', () => {
    const name = mockProductName();
    const durationInteger = randomNumber(20, 59);
    const duration = `00:${durationInteger}`;

    it('Deve buscar serviços utilizando os filtros', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="duration"]').type(duration);
      cy.intercept('GET', `${API_URL}/labor?*`).as('request');
      cy.get('.actions > [styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.query.name).to.equal(name);
        expect(interception.request.query.duration).to.equal(durationInteger.toString());
        expect(interception.request.query.page).to.equal('1');
        expect(interception.request.query.per_page).to.equal('5');
      });
    });
  });

  describe('Cadastro', () => {
    const name = mockProductName();
    const duration = `00:${randomNumber(20, 59)}`;

    beforeEach(() => {
      cy.get('.footer > p-button.p-element > .p-ripple').click();
    });
    
    it('Deve cadastrar um novo serviço com sucesso', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="duration"]').type(duration);
      cy.intercept('POST', `${API_URL}/labor`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Serviço cadastrado com sucesso');
        cy.location('pathname').should('equal', '/labors');
      });
    });
  });

  describe('Edição', () => {
    const name = mockProductName();

    beforeEach(() => {
      cy.get(':nth-child(1) > :nth-child(5) > p-button.p-element > .p-ripple').click();
    });

    it('Deve editar um serviço com sucesso', () => {
      cy.get('[data-test="name"]').clear().type(name);
      cy.get('[data-test="duration"] > .p-inputtext').should('have.attr', 'disabled');
      cy.intercept('PUT', `${API_URL}/labor/*`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();
      
      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Serviço atualizado com sucesso');
        cy.location('pathname').should('equal', '/labors');
      });
    });
  });
});