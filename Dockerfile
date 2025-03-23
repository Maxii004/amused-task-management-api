# Stage 1: Build the application
FROM node:16 AS builder

WORKDIR /app

COPY .env ./
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY config ./config

RUN npm install
RUN npm run build  # This will run `tsc && tsc-alias`

# Stage 2: Production image
FROM node:16

WORKDIR /app

COPY --from=builder /app/.env ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config  

RUN npm install --production

EXPOSE 3000
CMD ["node", "dist/src/server.js"]