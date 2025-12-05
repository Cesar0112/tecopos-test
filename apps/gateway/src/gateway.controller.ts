import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { lastValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private http: HttpService) { }

  @All('auth/*')
  async authProxy(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await lastValueFrom(
        this.http.request({
          url: `http://sso:3000${req.path.replace('/auth', '')}`,
          method: req.method,
          data: req.body,
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @All('bank/*')
  async bankProxy(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await lastValueFrom(
        this.http.request({
          url: `http://bank:3000${req.path.replace('/bank', '')}`,
          method: req.method,
          data: req.body,
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
