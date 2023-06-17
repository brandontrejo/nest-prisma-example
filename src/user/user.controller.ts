import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetAuthUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthUserDto } from 'src/auth/dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@GetAuthUser() authUser: AuthUserDto): Promise<User> {
    return this.userService.getUser(authUser.id);
  }
}
