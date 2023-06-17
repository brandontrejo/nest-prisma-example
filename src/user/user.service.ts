import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async getUser(user_id: string): Promise<User> {
    return await this.userRepository.getUser(user_id);
  }
}
