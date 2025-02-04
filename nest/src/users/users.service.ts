import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    //Get User
    async getUser(credentials : Users) : Promise<Users>{
      const user = await this.usersRepository.findOne({ where: { email : credentials.email } });
  
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      delete user.salt;
      delete user.password;
      delete user.email;
      return user;
    }

  //Register Service
  async register(userData: CreateUserDto){
    const user = this.usersRepository.create({
      ...userData
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    const payload = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    };
    const jwt = await this.jwtService.sign(payload);
    try {
      await this.usersRepository.save(user);
    } catch (e) {
      throw new ConflictException(`Email has been used`);
    }
    return {
      "access_token" : jwt
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
      throw new NotFoundException('Wrong email or password');
    }
  }

  //Update Service
  async updateUser(user,credentials : UpdateUserDto){
    const old_user = await this.usersRepository.findOne({ where: { id : user.id } });
    if (!old_user) {
      throw new NotFoundException(`User not found`);
    }
    return this.usersRepository.update(old_user.id,credentials);
  }


}
