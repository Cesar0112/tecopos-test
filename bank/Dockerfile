# ============================
# 1. BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos del proyecto
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Compilar NestJS
RUN yarn build


# ============================
# 2. PRODUCTION STAGE
# ============================
FROM node:20-alpine

WORKDIR /app

# Solo dependencias necesarias en producción
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copiar la build
COPY --from=builder /app/dist ./dist

# Variables
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/main.js"]
