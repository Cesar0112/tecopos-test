import { Controller, All, Req, Res, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { lastValueFrom } from 'rxjs';

@ApiTags('Gateway')
@Controller()
export class GatewayController {
  constructor(private readonly http: HttpService) { }

  private forwardHeaders(req: Request) {
    const headers: Record<string, string> = {};

    if (req.headers['authorization']) {
      headers['authorization'] = req.headers['authorization'];
    }

    if (req.headers['content-type']) {
      headers['content-type'] = req.headers['content-type'];
    }

    return headers;
  }

  /*  @Post('auth/login')
    @ApiOperation({ summary: 'Login de usuario' })
    @ApiResponse({ status: 200, description: 'Login exitoso, devuelve JWT' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async loginDoc(@Req() req: Request, @Res() res: Response) {
      return await this.authProxy(req, res);
    }
    @Post('auth/register')
    @ApiOperation({ summary: 'Registro de usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async registerDoc(@Body() body: any, @Res() res: Response) {
      return res.json({ message: 'Proxy hacia Auth Service /register' });
    }
  */
  @All('auth/*')
  //@ApiExcludeEndpoint()
  async authProxy(@Req() req: Request, @Res() res: Response) {
    const url = `${process.env.SSO_URL}${req.path}`;
    try {
      const response = await lastValueFrom(
        this.http.request({
          url,
          method: req.method,
          data: req.body,
          headers: this.forwardHeaders(req),
        })
      );
      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: error.message });
    }
  }


  @UseGuards(JwtAuthGuard)
  @All('bank/*')
  //@ApiExcludeEndpoint()
  async bankProxy(@Req() req: Request, @Res() res: Response) {
    const url = `${process.env.BANK_URL}${req.path}`;

    try {
      const response = await lastValueFrom(
        this.http.request({
          url,
          method: req.method,
          data: req.body,
          headers: this.forwardHeaders(req),
        })
      );
      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: error.message });
    }
  }
}
