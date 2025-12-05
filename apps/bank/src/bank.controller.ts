import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { BankService } from './bank.service';
import { AuthGuard } from '@nestjs/passport';

@Controller("bank")
export class BankController {
  constructor(private readonly bankService: BankService) { }
  @UseGuards(AuthGuard('jwt'))
  @Get('accounts')
  getAccounts(@Req() req) {
    return this.bankService.getAccountsByUser(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('accounts/:id/operations')
  getOperations(@Param('id') id: string) {
    return this.bankService.getOperationsForAccount(Number(id));
  }
}
