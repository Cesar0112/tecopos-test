import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

describe('BankController', () => {
  let bankController: BankController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [BankService],
    }).compile();

    bankController = app.get<BankController>(BankController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bankController.getHello()).toBe('Hello World!');
    });
  });
});
