FROM node:18.16.0 AS base

RUN apt-get update -y

FROM base AS server

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma
RUN npm i
RUN npm run postinstall

COPY . .

RUN npm run build
RUN npm run postinstall

CMD ["npm", "run", "start:dev"]
