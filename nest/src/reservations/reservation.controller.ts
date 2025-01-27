import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorator/user.decorator';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}


  @Get()
  @UseGuards(JwtAuthGuard)
  getReservation(
    @User() user
  ) {
    return this.reservationService.getReservation(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  addReservation(
    @Body() createReservationDto: CreateReservationDto,
    @User() user
  ) {
    return this.reservationService.addReservation(createReservationDto,user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateReservation(
    @Body() updateReservationDto: UpdateReservationDto,
    @Param('id') id: string
  ) {
    return this.reservationService.updateReservation(id,updateReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }
}
