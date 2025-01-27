import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService
  ){}

  //Register Service
  async register(userData: CreateUserDto): Promise<Partial<Users>> {
    const user = this.usersRepository.create({
      ...userData
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.usersRepository.save(user);
    } catch (e) {
      throw new ConflictException(`Email a été utilisé`);
    }
    return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      };

  }
  // Login Service
  async login(credentials: LoginDto) {

     const {email, password} = credentials;
    const user = await this.usersRepository.createQueryBuilder("users")
      .where("users.email = :email",
        {email}
        )
      .getOne();

    if (!user)
      throw new NotFoundException('Wrong email or password');

    const hashedPassword = await bcrypt.hash(password, user.salt);

    if (hashedPassword === user.password) {
      const payload = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        "access_token" : jwt
      };
    } else {
      throw new NotFoundException('username ou password erronée');
    }
  }


}
