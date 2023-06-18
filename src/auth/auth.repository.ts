import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { RegisterRequestDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async getUserById(user_id: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        id: user_id,
      },
    });
  }

  async createUser(registerRequestDto: RegisterRequestDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerRequestDto.password, saltOrRounds);

    return await this.prismaService.user.create({
      data: {
        email: registerRequestDto.email,
        name: registerRequestDto.name,
        password: hash,
      },
    });
  }
}
