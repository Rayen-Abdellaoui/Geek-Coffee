import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  create(@Body() userData: CreateUserDto) {
    return this.usersService.register(userData);
  }

  @Post('login')
  login(
    @Body() credentials: LoginDto
  ) {
    return this.usersService.login(credentials);
  }

}
