
FROM node:18-alpine AS deps

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
COPY tailwind.config.ts ./tailwind.config.ts
COPY tsconfig.json ./tsconfig.json
COPY postcss.config.mjs ./postcss.config.mjs

RUN npm install --frozen-lockfile


# Rebuild the source code only when needed
FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY next.config.ts ./
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY public ./public
COPY tailwind.config.ts ./tailwind.config.ts
COPY tsconfig.json ./tsconfig.json
COPY postcss.config.mjs ./postcss.config.mjs
# COPY styles ./styles

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# EXPOSE 3000

# ENV PORT=3000

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

# RUN npm install

# COPY . .
# COPY next.config.ts ./next.config.ts

# # COPY pages ./pages
# COPY public ./public
# COPY tailwind.config.ts ./tailwind.config.ts
# COPY tsconfig.json ./tsconfig.json

# # EXPOSE 3000

# CMD ["npm", "run", "dev"]