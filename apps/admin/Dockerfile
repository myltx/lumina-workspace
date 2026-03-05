FROM node:20-alpine AS builder

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm with Taobao mirror
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm@8.14.0
RUN pnpm config set registry https://registry.npmmirror.com
COPY . .
ENV PRISMA_ENGINES_MIRROR=https://npmmirror.com/mirrors/prisma/
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate

ENV NEXT_TELEMETRY_DISABLED 1
# Build the admin application
RUN pnpm --filter admin build

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public

# Must retain permissions for the uploads folder if using local disk storage
RUN mkdir -p ./apps/admin/public/uploads && chown -R nextjs:nodejs ./apps/admin/public/uploads

USER nextjs

EXPOSE 3001
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/admin/server.js"]
