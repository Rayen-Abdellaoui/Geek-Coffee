import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsNotEmpty()
  password: string;

}