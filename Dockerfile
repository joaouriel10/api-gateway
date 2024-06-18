FROM node:18-alpine3.19 as build

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "start:dev"]
