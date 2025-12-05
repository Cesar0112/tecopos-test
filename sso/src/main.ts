import { NestFactory } from '@nestjs/core';
import { SsoModule } from './sso.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SsoModule);


  const config = new DocumentBuilder()
    .setTitle('SSO')
    .setDescription('Prueba técnica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               // elimina propiedades no declaradas
    forbidNonWhitelisted: true,    // rechaza requests con props extra
    transform: true,               // transforma payloads a instancias de DTO
    transformOptions: { enableImplicitConversion: true },
    exceptionFactory: (errors) => {
      // opcional: formatea el error de validación
      const formatted = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));
      return new BadRequestException({ message: 'Validation failed', details: formatted });
    },
  }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3002;
  app.enable('x-powered-by');
  await app.listen(port);
  console.log(`SSO is running on: http://localhost:${port}`);
}
bootstrap();