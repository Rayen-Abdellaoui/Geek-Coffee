import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
      @IsString()
      @IsNotEmpty()
      name: string;
    
      @IsString()
      @IsNotEmpty()
      lastname: string;
    
      @IsPhoneNumber()
      @IsNotEmpty()
      phone: string;
    
      @IsEmail({}, { message: 'Email invalide' })
      email: string;

      @IsString()
      @IsNotEmpty()
      @MinLength(8)
      password: string;

      @IsString()
      salt: string;
}
