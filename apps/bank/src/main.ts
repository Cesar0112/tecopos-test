import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { BankModule } from './bank.module';

async function bootstrap() {
  const app = await NestFactory.create(BankModule);
  const serviceName = 'Bank';
  const config = new DocumentBuilder()
    .setTitle(`${serviceName} - TECOPOS`)
    .setDescription('Prueba técnica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // → http://localhost:3000/api
  await app.listen(3000);
}
bootstrap();
