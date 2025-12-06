// src/bank/dto/account.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class OperationDto {
    @ApiProperty({ example: 1, description: 'ID numérico de la operación' })
    id: number;

    @ApiProperty({ example: 1, description: 'ID de la cuenta asociada' })
    accountId: number;

    @ApiProperty({ example: 'deposit', description: 'Tipo de operación' })
    type: string;

    @ApiProperty({ example: 1500, description: 'Monto de la operación' })
    amount: number;

    @ApiProperty({ example: '2025-01-01', description: 'Fecha de la operación' })
    date: string;
}
