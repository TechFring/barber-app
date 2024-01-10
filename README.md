# barber-app

## Importante
Para que o projeto barber-app funcione corretamente, é necessário que o projeto barber-api esteja em execução. Caso ainda não esteja em execução, siga os passos indicados no link a seguir antes de prosseguir: [barber-api](https://github.com/TechFring/barber-api/tree/dev).

## Screenshot
![image](https://github.com/TechFring/barber-app/assets/54766216/388da814-3b7c-4b58-b2c1-bd883471b0c3)

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
3. Após isso o projeto ficará disponível em http://localhost:8080.

### Ambiente de Produção
Siga os passos abaixo para executar o projeto em ambiente de produção:

1. Execute o comando `docker-compose build` para construir a imagem.
2. Execute o comando `docker-compose up` para criar/iniciar o container.
3. Após isso o projeto ficará disponível em http://localhost:8080.

## Testes End-to-End
Para executar os testes end-to-end, é necessário configurar as variáveis de ambiente.
Para isso você deve criar um chamado **.env** no diretório raiz do projeto, o conteúdo desse arquivo deve seguir o exemplo abaixo:

```env
# Credenciais do usuário utilizadas durante os testes
CYPRESS_LOGIN=admin
CYPRESS_PASSWORD=01234567
```

Com o arquivo **.env** criado e configurado corretamente, basta rodar o comando `npm run cy:run` para que os testes sejam executados.
