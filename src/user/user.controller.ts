import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetAuthUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { AuthUserDto } from 'src/auth/dto';
import { UserResponse } from 'src/core/types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers(): Promise<UserResponse[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@GetAuthUser() authUser: AuthUserDto): Promise<UserResponse> {
    return this.userService.getUser(authUser.id);
  }
}
