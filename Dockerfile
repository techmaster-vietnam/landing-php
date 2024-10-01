# Stage 1

FROM node:22-alpine3.20 as build-stage

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY ./ .

RUN yarn build

# Stage 2

FROM nginx:stable-alpine-slim as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf