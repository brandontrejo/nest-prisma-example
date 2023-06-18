import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResponse } from 'src/core/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserResponse[]> {
    return await this.userRepository.getUsers();
  }

  async getUser(user_id: string): Promise<UserResponse> {
    return await this.userRepository.getUser(user_id);
  }
}
