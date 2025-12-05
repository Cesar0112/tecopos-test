# TECOPOS - Prueba Técnica Backend

Microsistema dockerizado con:

- Gateway (NestJS) con regla básica de seguridad JWT
- SSO (Single Sign-On) con PostgreSQL + Prisma
- Bank (cuentas y operaciones protegidas) – datos mock in-memory
- Docker Compose + .env.example
- Swagger en los 3 servicios

## Requisitos cumplidos

- 1 Gateway con protección JWT en rutas `/bank/*`
- 1 SSO con registro, login y JWT
- 1 Bank protegido por JWT
- Docker Compose levanta todo (postgres + 3 servicios)
- Swagger documentado en cada servicio
- Conventional Commits

## Cómo ejecutar localmente

```bash
# 1. Clonar y entrar
git clone <tu-repo>
cd tecopos-test

# 2. Copiar variables
cp .env.example .env

# 3. Levantar todo
docker-compose up --build

# Servicios disponibles:
# - Gateway + Swagger → http://localhost:3000/api
# - SSO directo       → http://localhost:3001/api
# - Bank directo      → http://localhost:3002/api
```
