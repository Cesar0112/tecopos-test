import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.register({

      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }

    }),
  ],
  controllers: [BankController],
  providers: [BankService, JwtStrategy],
})
export class BankModule { }
