import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const config = new DocumentBuilder()
    .setTitle(`Gateway`)
    .setDescription('Prueba técnica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // → http://localhost:3000/api
  await app.listen(3000).then(() => {
    console.log(`Gateway is running on: http://localhost:3000`);
  });
}
bootstrap();
