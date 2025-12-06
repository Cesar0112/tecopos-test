# TECOPOS - Prueba Técnica Backend

Microsistema dockerizado con:

Cada Microservicio es un proyecto independiente

- Gateway (NestJS) con regla básica de seguridad JWT
- SSO (Single Sign-On) con PostgreSQL + Prisma
- Bank (cuentas y operaciones protegidas) – datos mock in-memory
- Docker Compose + .env.example
- Swagger en los 3 servicios

## Arquitectura General

- SSO → Registra y autentica usuarios. Emite JWT.
- Bank Service → Devuelve cuentas bancarias simuladas. Requiere JWT.
- Gateway → Entrada única. Redirige tráfico y valida tokens.

---

📦 Microservicio 1 – SSO Service

### Descripción

Servicio encargado de autenticación, registro de usuarios y emisión de tokens JWT.
Funciona con PostgreSQL y expone su documentación Swagger.

## Requisitos cumplidos

- 1 Gateway con protección JWT en rutas
- 1 SSO con registro, login y JWT
- 1 Bank protegido por JWT
- Docker Compose levanta todo (postgres + 3 servicios)
- Swagger documentado en cada servicio
- Conventional Commits

## Cómo ejecutar localmente

✔ Cómo iniciar todo el sistema manualmente

Levantar PostgreSQL

Iniciar SSO

Iniciar Bank

Iniciar Gateway

Consumir solo mediante:

```bash
# 1. Clonar y entrar
git clone https://github.com/Cesar0112/tecopos-test.git
cd tecopos-test

cd sso
yarn run start

y

cd ../
cd gateway
yarn run start

y

cd ../
cd bank
yarn run start

```

## Swagger disponible en

- Bank directo → http://localhost:3000/api
- Gateway + Swagger → http://localhost:3001/api
- SSO directo → http://localhost:3002/api
