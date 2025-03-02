FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci


FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build
ENV NODE_ENV=production
RUN npm ci --only=production && npm cache clean --force


FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/main"]