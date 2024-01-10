/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';

describe('Auth', () => {
  it('Deve realizar a autenticação com sucesso', () => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.intercept('POST', `${API_URL}/user/auth`).as('request');
    cy.get('.p-ripple').click();

    cy.wait('@request').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.location('pathname').should('equal', '/schedules');
    });
  });
  
  it('Deve validar o preenchimento dos campos', () => {
    cy.visit('/auth');
    cy.get('.p-ripple').click();
    cy.location('pathname').should('equal', '/auth');
  });

  it('Deve ocorre um erro quando as credenciais estiverem incorretas', () => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type('teste');
    cy.get('[data-test="password"]').type('  ');
    cy.intercept('POST', `${API_URL}/user/auth`).as('request');
    cy.get('.p-ripple').click();

    cy.wait('@request').then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Login ou senha incorretos');
    });
  });

  it('Deve redirecionar para a rota /auth quando o usuário tentar acessar uma rota privada e não estiver autenticado', () => {
    cy.visit('/schedules');
    cy.location('pathname').should('equal', '/auth');
  });

  it('Deve redirecionar para a rota /schedules quando o usuário tentar acessar uma rota pública e estiver autenticado', () => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.intercept('POST', `${API_URL}/user/auth`).as('request');
    cy.get('.p-ripple').click();

    cy.wait('@request').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.visit('/auth');
      cy.location('pathname').should('equal', '/schedules');
    });
  });
});