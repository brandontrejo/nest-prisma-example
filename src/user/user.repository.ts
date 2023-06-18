import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { User } from '@prisma/client';
import { UserResponse } from 'src/core/types';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async getUsers(): Promise<UserResponse[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async getUser(user_id: string): Promise<UserResponse> {
    return await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
