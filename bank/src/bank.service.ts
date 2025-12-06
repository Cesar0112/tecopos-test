import { Injectable, Logger } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';
import { AccountDto } from './dto/account.dto';
import { WebhookService } from './webhook/webhook.service';

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name);
  constructor(private readonly webhook: WebhookService) { }
  private readonly accounts: AccountDto[] = [
    { id: 1, type: 'checking', balance: 1200, currency: 'USD' },
    { id: 2, type: 'savings', balance: 3000, currency: 'USD' },
  ];

  private operations: OperationDto[] = [
    { id: 1, accountId: 1, type: 'deposit', amount: 500, date: '2025-01-01' },
    { id: 2, accountId: 1, type: 'withdrawal', amount: 200, date: '2025-01-05' },
    { id: 3, accountId: 2, type: 'deposit', amount: 3000, date: '2025-02-01' },
  ];

  getAccountsByUser(userId: number) {
    return this.accounts;
  }

  getOperationsForAccount(id: number) {
    return this.operations.filter(op => op.accountId === id);
  }

  async createOperation(accountId: number, dto: Omit<OperationDto, 'accountId'>) {

    this.operations.push({
      accountId,
      ...dto,
    });
    const op = this.operations.at(- 1)!;

    this.webhook.notify(op).catch(err => {
      this.logger.error('Webhook failed after retries', err.message);
    });
    return op;
  }
}
