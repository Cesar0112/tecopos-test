import { NestFactory } from '@nestjs/core';
import { BankModule } from './bank.module';

async function bootstrap() {
  const app = await NestFactory.create(BankModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
