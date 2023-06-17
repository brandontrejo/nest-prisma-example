import { AuthUserDto, JwtDto } from './dto';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWT_STRATEGY_NAME } from './constants';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  private async validate(decoded: JwtDto) {
    const user = await this.authService.validateUser(decoded);

    const authUser: AuthUserDto = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return authUser;
  }
}
