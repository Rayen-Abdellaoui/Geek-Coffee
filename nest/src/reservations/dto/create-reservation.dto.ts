import { IsString, IsEmail, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  hour_start: string;

  @IsString()
  @IsNotEmpty()
  hour_end: string;

  @IsNumber()
  @IsNotEmpty()
  guests: number;

  @IsString()
  @IsNotEmpty()
  category: string;
  
}
