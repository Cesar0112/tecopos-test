import { NestFactory } from '@nestjs/core';
import { SsoModule } from './sso.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SsoModule);


  const config = new DocumentBuilder()
    .setTitle('SSO')
    .setDescription('Prueba técnica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`SSO is running on: http://localhost:${port}`);
}
bootstrap();
