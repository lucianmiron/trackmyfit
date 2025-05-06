import { Injectable } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { TokenPayload } from './interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
