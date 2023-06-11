import { Controller, Param, Body, Get, Post } from '@nestjs/common';

import { CreateUserDto } from './dto';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('users/:user_id')
  getUser(@Param('user_id') user_id: string): Promise<User> {
    return this.userService.getUser(user_id);
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
