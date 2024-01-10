/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';
import { mockLogin, mockName, randomNumber } from '../mocks';

describe('Users', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.get('.p-ripple').click();
    cy.get('.sidebar-list > :nth-child(5) > .sidebar-link').click();
  });

  describe('Filtro', () => {
    const name = mockName();
    const login = mockLogin(name);
    const level = randomNumber(1, 3);

    it('Deve buscar usuários utilizando os filtros', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="login"]').type(login);
      cy.get('[data-test="level"]').click();
      cy.get(`.p-dropdown-panel p-dropdownitem:nth-child(${level + 1})`).click();
      cy.intercept('GET', `${API_URL}/user?*`).as('request');
      cy.get('.actions > [styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.query.name).to.equal(name);
        expect(interception.request.query.login).to.equal(login);
        expect(interception.request.query.level).to.equal(level.toString());
        expect(interception.request.query.page).to.equal('1');
        expect(interception.request.query.per_page).to.equal('5');
      });
    });
  });

  describe('Cadastro', () => {
    const name = mockName();
    const login = mockLogin(name);
    const level = randomNumber(1, 3);
    const password = '00000000';

    beforeEach(() => {
      cy.get('.footer > p-button.p-element > .p-ripple').click();
    });
    
    it('Deve cadastrar um novo usuário com sucesso', () => {
      cy.get('[data-test="name"]').type(name);
      cy.get('[data-test="login"]').type(login);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="confirm"]').type(password);
      cy.get('[data-test="level"]').click();
      cy.get(`.p-dropdown-panel p-dropdownitem:nth-child(${level + 1})`).click();
      cy.intercept('POST', `${API_URL}/user`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Usuário cadastrado com sucesso');
        cy.location('pathname').should('equal', '/users');
      });
    });
  });

  describe('Edição', () => {
    const name = mockName();
    const level = randomNumber(1, 3);
    const password = '00000000';

    beforeEach(() => {
      cy.get('.p-datatable-table tr:last-child > td:nth-child(6) > p-button > button').click();
    });

    it('Deve editar um usuário com sucesso', () => {
      cy.get('[data-test="name"]').clear().type(name);
      cy.get('[data-test="login"]').should('have.attr', 'disabled');
      cy.get('[data-test="level"]').click();
      cy.get(`.p-dropdown-panel p-dropdownitem:nth-child(${level + 1})`).click();
      cy.intercept('PUT', `${API_URL}/user/*`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();
      
      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Usuário atualizado com sucesso');
        cy.location('pathname').should('equal', '/users');
      });
    });

    it('Deve alterar a senha do usuário com sucesso', () => {
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="confirm"]').type(password);
      cy.intercept('PUT', `${API_URL}/user/*`).as('request');
      cy.get('[styleclass="p-button-sm"] > .p-ripple').click();

      cy.wait('@request').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Usuário atualizado com sucesso');
        cy.location('pathname').should('equal', '/users');
      });
    });
  });
});