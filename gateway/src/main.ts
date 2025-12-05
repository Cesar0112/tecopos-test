import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

  const config = new DocumentBuilder()
    .setTitle(`Gateway API`)
    .setDescription('Proxy hacia Auth y Bank Services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enable('x-powered-by')
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3001;
  if (process.env.PROXY)
    app.set('trust proxy', 'loopback');
  await app.listen(port);
  console.log(`Gateway is running on: http://localhost:${port}`);
}
bootstrap();