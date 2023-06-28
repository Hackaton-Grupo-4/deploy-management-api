FROM node:16-alpine3.14
RUN npm install -g prisma

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --only=prod
RUN prisma generate
