import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TableModule } from '../tables/table.module';
import { Table } from '../tables/entity/table.entity';
//import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Table]),
    TableModule,
    //MailModule,
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
