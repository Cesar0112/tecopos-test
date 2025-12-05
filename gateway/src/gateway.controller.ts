import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { lastValueFrom } from 'rxjs';

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

  // =========================================
  //  AUTH SERVICE
  // =========================================
  @All('auth/*')
  async authProxy(@Req() req: Request, @Res() res: Response) {
    const url = `${process.env.SSO_URL}${req.path}`;
    console.log("Proxying to Auth Service:", url);
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

  // =========================================
  //  BANK SERVICE
  // =========================================
  @UseGuards(JwtAuthGuard)
  @All('bank/*')
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
