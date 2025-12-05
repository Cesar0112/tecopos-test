# ============================
# 1) Build stage
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar el código
COPY . .

# Compilar NestJS
RUN yarn build


# ============================
# 2) Run stage
# ============================
FROM node:20-alpine

WORKDIR /app

# Solo copiar lo necesario
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

# Puerto del microservicio
EXPOSE 3002

# Comando para arrancar Nest
CMD ["node", "dist/main.js"]
