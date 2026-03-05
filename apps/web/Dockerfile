FROM node:20-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# 提升 Alpine 源拉取速度 (国内阿里云源)
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm, setting Taobao mirror to heavily speed up downloads
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm@8.14.0
RUN pnpm config set registry https://registry.npmmirror.com

# Copy source code
COPY . .

# Install dependencies & generate Prisma client
# 必须在 pnpm install 之前就指定下载镜像，因为 pnpm install 安装 @prisma/client 时就会触发引擎下载
ENV PRISMA_ENGINES_MIRROR=https://npmmirror.com/mirrors/prisma/
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate

# Build the web application
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm --filter web build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build output
# In a Monorepo, the standalone output retains the folder structure (e.g., apps/web/server.js)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000
ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/web/server.js"]
