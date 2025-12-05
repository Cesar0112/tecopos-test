import { Injectable } from '@nestjs/common';

@Injectable()
export class BankService {
  getHello(): string {
    return 'Hello World!';
  }
}
