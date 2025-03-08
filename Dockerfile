FROM node:22.4.0-alpine3.19 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM node:22.4.0-alpine3.19

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY .env .env

COPY package*.json ./


EXPOSE 3030

CMD ["node", "./dist/index.js"]