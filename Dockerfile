FROM node:18-alpine3.19 AS build

WORKDIR /usr/src/app

RUN chown 777 /usr/src/app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

RUN pnpm add rimraf --save-dev

COPY . .

RUN pnpm run build

EXPOSE 3001

ENTRYPOINT ["pnpm", "run", "start"]
