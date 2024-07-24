FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
