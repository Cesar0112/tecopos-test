import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RegisterDto, LoginDto } from './dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwt: JwtService,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    async register(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.usersRepo.create({
            email: dto.email,
            password: hashed,
        });

        await this.usersRepo.save(user);
        return this.signToken(user.id, user.email);
    }

    async login(dto: LoginDto) {
        const user = await this.usersRepo.findOne({
            where: { email: dto.email },
        });

        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return this.signToken(user.id, user.email);
    }

    private signToken(userId: number, email: string) {
        return this.jwt.signAsync({ sub: userId, email });
    }
}