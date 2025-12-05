import { Injectable } from '@nestjs/common';

@Injectable()
export class BankService {

  private accounts = [
    { id: 1, type: 'checking', balance: 1200, currency: 'USD' },
    { id: 2, type: 'savings', balance: 3000, currency: 'USD' },
  ];

  private operations = [
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
}
