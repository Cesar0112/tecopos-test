import { NestFactory } from '@nestjs/core';
import { SsoModule } from './sso.module';

async function bootstrap() {
  const app = await NestFactory.create(SsoModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
