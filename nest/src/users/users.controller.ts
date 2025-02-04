import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorator/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(
    @User() user
  ) {
    return this.usersService.getUser(user);
  }

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

    @Put()
    @UseGuards(JwtAuthGuard)
    updateUser(
      @User() user,
      @Body() credentials: UpdateUserDto
    ) {
      return this.usersService.updateUser(user,credentials);
    }

}
