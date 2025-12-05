import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SsoService } from './sso.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class SsoController {
  constructor(private readonly ssoService: SsoService) { }

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  register(@Body() dto: RegisterDto) {
    return this.ssoService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso, devuelve JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() dto: LoginDto) {
    return this.ssoService.login(dto);
  }

}
