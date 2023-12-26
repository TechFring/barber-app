# barber-app

## Importante
Para que o projeto barber-app funcione corretamente, é necessário que o projeto barber-api esteja em execução. Caso ainda não esteja em execução, siga os passos indicados no link a seguir antes de prosseguir: [barber-api](https://github.com/TechFring/barber-api/tree/dev).

## Pré-requisitos
Certifique-se de que as seguintes ferramentas estejam instaladas e configuradas em seu ambiente antes de executar o projeto:

- Node.js 18.17
- Docker
- Docker Compose

## Execução do Projeto

### Ambiente de Desenvolvimento
Siga os passos abaixo para executar o projeto em ambiente de desenvolvimento:

1. Execute o comando `npm install` para instalar as dependências do projeto.
2. Execute o comando `npm start` para iniciar o projeto.
3. Após isso o projeto ficará disponível em http://localhost:4200.

### Ambiente de Produção
Siga os passos abaixo para executar o projeto em ambiente de produção:

1. Execute o comando `docker-compose build` para construir a imagem do projeto.
2. Execute o comando `docker-compose up` para iniciar o container do projeto.
3. Após isso o projeto ficará disponível em http://localhost:8080.

## Testes End-to-End
**Em Construção**
