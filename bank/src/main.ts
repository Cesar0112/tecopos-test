import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { BankModule } from './bank.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BankModule);
  const config = new DocumentBuilder()
    .setTitle('Bank')
    .setDescription('Prueba técnica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


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
  const port = process.env.PORT || 3000;
  app.enable('x-powered-by')
  await app.listen(port);
  console.log("Bank is running on port", port);
}
bootstrap();
