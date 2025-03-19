FROM node:18-alpine AS base


# install deps

FROM base AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install --force


# build application

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


# production

FROM base AS production

WORKDIR /app

ENV NODE_ENV=production

# COPYING ONLY NECESSARY FILES TO RUN APP

# COPY PUBLIC ASSETS (ex. photos)
COPY --from=builder /app/public ./public

# COPY STATIC ASSETS
COPY --from=builder /app/.next/static ./.next/static

# COPY ENTRYPOINT 
COPY --from=builder /app/.next/standalone ./


EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

# development

FROM base AS development

WORKDIR /app

ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD npm run dev