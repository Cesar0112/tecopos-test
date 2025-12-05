import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SsoService } from './sso.service';

@Controller('auth')
export class SsoController {
  constructor(private readonly ssoService: SsoService) { }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.ssoService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.ssoService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
