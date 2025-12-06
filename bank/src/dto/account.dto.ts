// src/bank/dto/account.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
    @ApiProperty({ example: 1, description: 'ID numérico de la cuenta' })
    id: number;

    @ApiProperty({ example: 'checking', description: 'Tipo de cuenta' })
    type: string;

    @ApiProperty({ example: 1500, description: 'Saldo disponible' })
    balance: number;

    @ApiProperty({ example: 'USD', description: 'Moneda de la cuenta' })
    currency: string;
}
