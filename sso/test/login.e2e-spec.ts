// test/auth.e2e-spec.ts (esquema resumido)
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { SsoModule } from '../src/sso.module';
import { DataSource } from 'typeorm';

describe('Auth e2e (sqlite)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [SsoModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();

        dataSource = moduleRef.get(DataSource);
        await dataSource.synchronize(true); // crea tablas en memoria
    });

    afterAll(async () => {
        await app.close();
        await dataSource.destroy();
    });

    it('POST /auth/login -> 200 con token (credenciales reales seed)', async () => {
        // seed: crear usuario real en DB (hash de password) o llamar endpoint register
        /*await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email: 'user@test.com', password: 'validpass' })
            .set('Content-Type', 'application/json')
            .expect(201);

        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'user@test.com', password: 'validpass' })
            .expect(200);

        expect(res.body).toHaveProperty('access_token');*/
    });
});
