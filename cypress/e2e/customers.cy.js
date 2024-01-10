/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';
import { mockName, mockEmail, mockPhone } from '../mocks';

describe('Customers', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.get('.p-ripple').click();
    cy.get('.sidebar-list > :nth-child(3) > .sidebar-link').click();
  });

  describe('Filtro', () => {
    const name = mockName();
    const phone = mockPhone();
    const email = mockEmail(name);

    it('Deve buscar clientes utilizando os filtros', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="phone"]').type(phone);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('GET', `${API_URL}/customer?*`).as('request');
      cy.get('.actions > [styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.query.name).to.equal(name);
        expect(interception.request.query.phone).to.equal(phone);
        expect(interception.request.query.email).to.equal(email);
        expect(interception.request.query.page).to.equal('1');
        expect(interception.request.query.per_page).to.equal('5');
      });
    });
  });

  describe('Cadastro', () => {
    const name = mockName();
    const phone = mockPhone();
    const email = mockEmail(name);

    beforeEach(() => {
      cy.get('.footer > p-button.p-element > .p-ripple').click();
    });
    
    it('Deve cadastrar um novo cliente com sucesso', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="phone"]').type(phone);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('POST', `${API_URL}/customer`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Cliente cadastrado com sucesso');
        cy.location('pathname').should('equal', '/customers');
      });
    });
  
    it('Deve ocorrer um erro quando o número de telefone já estiver sendo utilizado por outro cliente', () => {
      const name = mockName();
      const email = mockEmail(name);

      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="phone"]').type(phone);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('POST', `${API_URL}/customer`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(400);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'O telefone informado já está em uso');
      });
    });
  
    it('Deve ocorrer um erro quando o email já estiver sendo utilizado por outro cliente', () => {
      const name = mockName();
      const phone = mockPhone();

      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="phone"]').type(phone);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('POST', `${API_URL}/customer`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(400);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'O email informado já está em uso');
      });
    });
  });

  describe('Edição', () => {
    const name = mockName();
    const phone = mockPhone();
    const email = mockEmail(name);

    beforeEach(() => {
      cy.get(':nth-child(1) > :nth-child(6) > p-button.p-element > .p-ripple').click();
    });

    it('Deve editar um cliente com sucesso', () => {
      cy.get('[data-test="name"]').clear().type(name);
      cy.get('[data-test="phone"]').clear().type(phone);
      cy.get('[data-test="email"]').clear().type(email);
      cy.intercept('PUT', `${API_URL}/customer/*`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();
      
      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Cliente atualizado com sucesso');
        cy.location('pathname').should('equal', '/customers');
      });
    });
  });
});