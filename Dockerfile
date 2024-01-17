FROM node:18.19 as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build:prod

FROM nginx:latest

COPY --from=build /usr/local/app/dist/app /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
