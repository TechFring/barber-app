/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';
import { mockName, mockDateBirth, mockDocument, mockEmail } from '../mocks';

describe('Barbers', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.get('.p-ripple').click();
    cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();
  });

  describe('Filtro', () => {
    const name = mockName();
    const document = mockDocument();
    const email = mockEmail(name);

    it('Deve buscar barbeiros utilizando os filtros', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="email"]').type(email);
      cy.get('[data-test="document"]').type(document);
      cy.intercept('GET', `${API_URL}/barber?*`).as('request');
      cy.get('.actions > [styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.query.name).to.equal(name);
        expect(interception.request.query.document).to.equal(document);
        expect(interception.request.query.email).to.equal(email);
        expect(interception.request.query.page).to.equal('1');
        expect(interception.request.query.per_page).to.equal('5');
      });
    });
  });

  describe('Cadastro', () => {
    const name = mockName();
    const dateBirth = mockDateBirth();
    const document = mockDocument();
    const email = mockEmail(name);

    beforeEach(() => {
      cy.get('.footer > p-button.p-element > .p-ripple').click();
    });
    
    it('Deve cadastrar um novo barbeiro com sucesso', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="date_birth"]').type(`${dateBirth}{esc}`);
      cy.get('[data-test="document"]').type(document);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('POST', `${API_URL}/barber`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Barbeiro cadastrado com sucesso');
        cy.location('pathname').should('equal', '/barbers');
      });
    });
  
    it('Deve ocorrer um erro quando o documento já estiver sendo utilizado por outro barbeiro', () => {
      const name = mockName();
      const dateBirth = mockDateBirth();
      const email = mockEmail(name);

      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="date_birth"]').type(`${dateBirth}{esc}`);
      cy.get('[data-test="document"]').type(document);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('POST', `${API_URL}/barber`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(400);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'O documento informado já está em uso');
      });
    });
  
    it('Deve ocorrer um erro quando o email já estiver sendo utilizado por outro barbeiro', () => {
      const name = mockName();
      const dateBirth = mockDateBirth();
      const document = mockDocument();

      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="date_birth"]').type(`${dateBirth}{esc}`);
      cy.get('[data-test="document"]').type(document);
      cy.get('[data-test="email"]').type(email);
      cy.intercept('POST', `${API_URL}/barber`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(400);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'O email informado já está em uso');
      });
    });
  });

  describe('Edição', () => {
    const name = mockName();
    const dateBirth = mockDateBirth();
    const document = mockDocument();
    const email = mockEmail(name);

    beforeEach(() => {
      cy.get(':nth-child(1) > :nth-child(6) > p-button.p-element > .p-ripple').click();
    });

    it('Deve editar um barbeiro com sucesso', () => {
      cy.get('[data-test="name"]').clear().type(name);
      cy.get('[data-test="date_birth"]').type(`{esc}{selectall}{backspace}${dateBirth}`);
      cy.get('[data-test="document"]').clear().type(document);
      cy.get('[data-test="email"]').clear().type(email);
      cy.intercept('PUT', `${API_URL}/barber/*`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();
      
      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Barbeiro atualizado com sucesso');
        cy.location('pathname').should('equal', '/barbers');
      });
    });
  });
});