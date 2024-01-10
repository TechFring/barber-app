import { environment } from '../src/environments/environment';

export const API_URL = environment.apiUrl;

export const LOGIN = Cypress.env('LOGIN');

export const PASSWORD = Cypress.env('PASSWORD');