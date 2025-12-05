import { Controller, Get } from '@nestjs/common';
import { BankService } from './bank.service';

@Controller()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  getHello(): string {
    return this.bankService.getHello();
  }
}
