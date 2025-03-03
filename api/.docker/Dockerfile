FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci


FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build
ENV NODE_ENV=production
RUN npm ci --only=production && npm cache clean --force


FROM base AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000

CMD npx typeorm migration:run -d dist/config/db/datasource.js && node dist/main.js