import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { BankService } from './bank.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccountDto } from './dto/account.dto';
import { OperationDto } from './dto/operation.dto';

@ApiTags('Bank')
@ApiBearerAuth()
@Controller("bank")
export class BankController {
  constructor(private readonly bankService: BankService) { }
  @UseGuards(AuthGuard('jwt'))
  @Get('accounts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener cuentas del usuario autenticado' })
  @ApiOkResponse({ description: 'Lista de cuentas del usuario', type: [AccountDto] })
  @ApiUnauthorizedResponse({ description: 'No autorizado. Token inválido o ausente' })
  getAccounts(@Req() req) {
    return this.bankService.getAccountsByUser(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('accounts/:id/operations')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener operaciones de una cuenta por ID' })
  @ApiParam({ name: 'id', description: 'ID numérico de la cuenta', example: 123 })
  @ApiOkResponse({ description: 'Listado de operaciones para la cuenta', type: [OperationDto] })
  @ApiBadRequestResponse({ description: 'ID de cuenta inválido' })
  @ApiUnauthorizedResponse({ description: 'No autorizado. Token inválido o ausente' })
  getOperations(@Param('id') id: string) {
    if (Number.isNaN(Number(id))) {
      throw new BadRequestException('ID de cuenta inválido');
    }
    return this.bankService.getOperationsForAccount(Number(id));
  }
}
