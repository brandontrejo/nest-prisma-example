import * as bcrypt from 'bcrypt';

import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginRequestDto, LoginResponse, RegisterRequestDto } from './dto';

import { AuthRepository } from './auth.repository';
import { JwtDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  public generateToken(user_id: string): string {
    try {
      return this.jwtService.sign({
        id: user_id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async validateUser(decoded: JwtDto): Promise<User> {
    return await this.authRepository.getUserById(decoded.id);
  }

  public async login(LoginRequestDto: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.authRepository.getUserByEmail(
      LoginRequestDto.email,
    );

    const isMatch = await bcrypt.compare(
      LoginRequestDto.password,
      user.password,
    );

    if (!user || !isMatch) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        error: ['Unauthorized'],
        token: null,
      };
    }

    const token: string = this.generateToken(user.id);

    return {
      token: token,
      status: HttpStatus.OK,
      error: null,
    };
  }

  public async register(registerRequestDto: RegisterRequestDto) {
    const user = await this.authRepository.createUser(registerRequestDto);

    const token: string = this.generateToken(user.id);

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      status: HttpStatus.OK,
      error: null,
    };
  }
}
