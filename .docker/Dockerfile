FROM node:18-alpine as base
USER root
RUN apk update && apk add --no-cache libc6-compat
RUN npm i -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install -no-frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build

FROM node:18-alpine
ARG HOST=0.0.0.0
ARG PORT=3000
ARG NODE_ENV=production
ARG LOGGING

ENV HOST=$HOST PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV TZ=Asia/Jakarta
ENV LOGGING=$LOGGING

USER node

WORKDIR /app
COPY --from=builder /app/dist ./
COPY package.json ./

EXPOSE ${PORT}

# HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD node node_modules/fastify-healthcheck/src/healthcheck http://localhost:${PORT}/alive
CMD [ "node", "index.js" ]
