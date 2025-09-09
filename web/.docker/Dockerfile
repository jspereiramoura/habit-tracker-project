FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS environment
ARG ENV_CONTENT
ENV ENV_CONTENT=$ENV_CONTENT
RUN echo "$ENV_CONTENT" > .env.production


FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=environment .env.production .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force


FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/.env.production .
USER nextjs
ENV HOSTNAME="0.0.0.0"
CMD [ "node", "server.js"]