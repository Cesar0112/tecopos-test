import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RegisterDto, LoginDto } from './dto';
import { User } from './user.entity';
@Injectable()
export class SsoService {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) { }

  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Usuario ya existe');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.usersRepo.save(
      this.usersRepo.create({
        email: dto.email,
        password: hashed,
      }),
    );

    return await this.signToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException();

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException();

    return await this.signToken(user.id, user.email);
  }

  private async signToken(userId: number, email: string) {
    const token = await this.jwt.signAsync({ sub: userId, email });

    return { access_token: token };
  }
}
