import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

  const config = new DocumentBuilder()
    .setTitle(`Gateway API`)
    .setDescription('Proxy hacia Auth y Bank Services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enable('x-powered-by')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
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
  const port = process.env.PORT || 3001;
  if (process.env.PROXY)
    app.set('trust proxy', 'loopback');
  await app.listen(port);
  console.log(`Gateway is running on: http://localhost:${port}`);
}
bootstrap();