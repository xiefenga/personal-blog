FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .

RUN npm config set registry https://registry.npmmirror.com/ 
RUN yarn install --frozen-lockfile

RUN yarn tsc

FROM base AS production

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist .

# 挂载数据卷 /app/configs

EXPOSE 8080

CMD ["node", "app.js"]
