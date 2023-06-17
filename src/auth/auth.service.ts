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

  // TODO: validated password
  public async login(LoginRequestDto: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.authRepository.getUserByEmail(
      LoginRequestDto.email,
    );

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['No user found with this email'],
        token: null,
      };
    }

    const token: string = this.generateToken(user.id);

    return { token, status: HttpStatus.OK, error: null };
  }

  // TODO: store bcrypt password
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
