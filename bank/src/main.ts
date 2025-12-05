import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { BankModule } from './bank.module';

async function bootstrap() {
  const app = await NestFactory.create(BankModule);
  const config = new DocumentBuilder()
    .setTitle('Bank')
    .setDescription('Prueba técnica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log("Bank is running on port", port);
}
bootstrap();
