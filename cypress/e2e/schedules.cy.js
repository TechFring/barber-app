/// <reference types="cypress" />

import { API_URL, LOGIN, PASSWORD } from '../constants';

describe('Schedules', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.get('[data-test="login"]').type(LOGIN);
    cy.get('[data-test="password"]').type(PASSWORD);
    cy.get('.p-ripple').click();
    cy.get('.sidebar-list > :nth-child(1) > .sidebar-link').click();
  });

  describe('Cadastro', () => {
    beforeEach(() => {
      cy.get('.footer > p-button.p-element > .p-ripple').click();
    });

    it('Deve criar um novo agendamento com sucesso', () => {
      cy.get('[data-test="barber"]').click();
      cy.get('.p-dropdown-panel p-dropdownitem :not(.p-disabled)').first().click();
      cy.get('[data-test="customer"]').click();
      cy.get('.p-dropdown-panel p-dropdownitem :not(.p-disabled)').first().click();
      cy.get('[data-test="labors"]').click();
      cy.get('.p-multiselect-panel p-multiselectitem :not(.p-disabled)').first().click();
      cy.get('[data-test="start"]').click();
      cy.intercept('POST', `${API_URL}/schedule/validate`).as('scheduleValidateRequest');
      cy.get('.p-datepicker-today > .p-ripple').click();

      cy.wait('@scheduleValidateRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.flex.ng-star-inserted > .flex > :nth-child(1) > .p-ripple').click();
        cy.intercept('POST', `${API_URL}/schedule`).as('scheduleRequest');
        cy.get('.flex > [styleclass="p-button-sm"] > .p-ripple').click();

        cy.wait('@scheduleRequest').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Agendamento cadastrado com sucesso');
        });
      });
    });
  });

  describe('Edição', () => {
    beforeEach(() => {
      cy.get('.fc-event-main').first().click();
    });

    it('Deve editar um novo agendamento com sucesso', () => {
      cy.get('[data-test="start"]').click();
      cy.intercept('POST', `${API_URL}/schedule/validate`).as('scheduleValidateRequest');
      cy.get('.p-datepicker-today > .p-ripple').click();

      cy.wait('@scheduleValidateRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        cy.get('.flex.ng-star-inserted > .flex > :nth-child(1) > .p-ripple').click();
        cy.intercept('PUT', `${API_URL}/schedule/*`).as('scheduleRequest');
        cy.get('.flex > [styleclass="p-button-sm"] > .p-ripple').click();

        cy.wait('@scheduleRequest').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          cy.get('.ng-trigger-toastAnimation > .ng-trigger').should('contain', 'Agendamento atualizado com sucesso');
        });
      });
    });
  });
});