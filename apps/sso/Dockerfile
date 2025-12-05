FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias raíz del monorepo
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar todo el monorepo
COPY . .

# Construir SOLO el microservicio sso
RUN yarn build sso

# ------------------ STAGE 2 ------------------
FROM node:20-alpine
WORKDIR /app

# Copiar solo la salida del microservicio sso
COPY --from=builder /app/dist/apps/sso ./dist/apps/sso

# Copiar dependencias mínimas necesarias
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

# Ejecutar el microservicio SSO
CMD ["node", "dist/apps/sso/main.js"]
