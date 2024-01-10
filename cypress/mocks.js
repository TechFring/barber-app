import { fakerPT_BR as faker } from '@faker-js/faker';

export const mockName = () => faker.person.fullName();

export const mockLogin = (name) => faker.internet.displayName({ firstName: name.replace(/(Sr|Sra)\./, '').trim().split(' ')[0] });

export const mockDateBirth = () => faker.date.birthdate({ min: 18, max: 50, mode: 'age' }).toLocaleDateString('pt-BR');

export const mockDate = () => faker.date.anytime().toLocaleDateString('pt-BR');

export const mockDocument = () => faker.number.int({ min: 10 ** 8, max: 19 ** 8 }).toString().padStart(11, '0');

export const mockEmail = (name) => faker.internet.email({ firstName: name });

export const mockPhone = () => faker.phone.number().replace(/[\(\)\-+\s]/g, '').slice(0, 11).padStart(11, '9');

export const mockProductName = () => faker.commerce.productName();

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;