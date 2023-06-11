import { CreateUserDto } from './dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { User } from '@prisma/client';

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

  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getUser(user_id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
      },
    });
  }
}
