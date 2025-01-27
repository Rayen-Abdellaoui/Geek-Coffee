import { Injectable, BadRequestException, UseGuards, Post, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../tables/entity/table.entity';
import { Reservation } from './entity/reservation.entity';
//import { MailService } from '../mail/mail.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UUID } from 'crypto';
import { NotFoundError } from 'rxjs';
import { UpdateReservationDto } from './dto/update-reservation.dto';

const CATEGORY_LIMITS = {
  'Playstation': 5,
  'Billard Table': 4,
  'Card Games': 3,
  'Ping Pong': 3,
};

@Injectable()
export class ReservationService {

  private readonly allowedHours = {
    Monday: { start: '12:00', end: '22:00' },
    Tuesday: { start: '12:00', end: '22:00' },
    Wednesday: { start: '12:00', end: '22:00' },
    Thursday: { start: '12:00', end: '22:00' },
    Friday: { start: '12:00', end: '22:00' },
    Saturday: { start: '09:00', end: '23:00' },
    Sunday: { start: '09:00', end: '20:00' },
  };

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    //private readonly mailService: MailService,
  ) {}

  private isValidTime(date: Date, startTime: string, endTime: string): boolean {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const { start, end } = this.allowedHours[day] || {};
    if (!start || !end) {
      console.log(`No valid hours found for ${day}`);
      return false;
    }

    const reservationStart = new Date(
      date.toISOString().split('T')[0] + 'T' + startTime + 'Z',
    );
    const reservationEnd = new Date(
      date.toISOString().split('T')[0] + 'T' + endTime + 'Z',
    );
    const validStart = new Date(
      date.toISOString().split('T')[0] + 'T' + start + 'Z',
    );
    const validEnd = new Date(
      date.toISOString().split('T')[0] + 'T' + end + 'Z',
    );

    return reservationStart >= validStart && reservationEnd <= validEnd;
  }

  private isValidDuration(startTime: string, endTime: string): boolean {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    return diffHours > 0;
  }
  
  private async avaibleTable(category,date,hour_start,hour_end) : Promise<Table>{
    const availableTable = await this.tableRepository
    .createQueryBuilder('table')
    .where('table.category = :category', { category })
    .andWhere(qb => {
      const subQuery = qb
        .subQuery()
        .select('1')
        .from(Reservation, 'reservation')
        .where('reservation.tableId = table.id')
        .andWhere('reservation.date = :date', { date })
        .andWhere(
          '(reservation.hour_start < :hour_end AND reservation.hour_end > :hour_start)',
          { hour_start, hour_end },
        )
        .getQuery();
      return `NOT EXISTS ${subQuery}`;
    })
    .getOne();
    return availableTable;
  }

  private async getCombinedReservations(
    date: Date,
    hour_start: string,
    hour_end: string,
    categoryIds: number[],
  ): Promise<number> {
    return this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.date = :date', { date })
      .andWhere('reservation.hour_start = :hour_start', { hour_start })
      .andWhere('reservation.hour_end = :hour_end', { hour_end })
      .andWhere('reservation.categoryId IN (:...categoryIds)', { categoryIds })
      .getCount();
  }

  async addReservation(reservationDto : CreateReservationDto, user) : Promise<Reservation>{

    const { date, hour_start, hour_end, category } = reservationDto;

    if (!date || !hour_start || !hour_end) {
      throw new BadRequestException(
        'Reservation Data Incomplete',
      );
    }

    let reservationDate = new Date(date);
    const now = new Date();
    console.log(reservationDate);
    if (isNaN(reservationDate.getTime()) || reservationDate < now) {
      throw new BadRequestException('Invalide Date');
    }

    if (!this.isValidTime(reservationDate, hour_start, hour_end)) {
      throw new BadRequestException(
        "The reservation is outside opening hours",
      );
    }

    if (!this.isValidDuration(hour_start, hour_end)) {
      throw new BadRequestException("The reservation duration is not valid");
    }

    // check if there is a table for the reservation in the chosen time
    const availableTable = await this.avaibleTable(category,date,hour_start,hour_end);
    if (!availableTable) {
      throw new NotAcceptableException('No available tables for the selected time and category.');
    }

    const newReservation = this.reservationRepository.create(reservationDto);
    newReservation.user = user;
    newReservation.table = availableTable;
    return this.reservationRepository.save(newReservation);
  }



  async getReservation(user): Promise<Reservation[] | null> {
    const reservation = await this.reservationRepository.find({where:{user : {id : user.id}}});
    if(reservation){
      return reservation;
    }
    else{
      throw new NotFoundException('No reservation has been found')
    }
  }



  async updateReservation(id : string, reservationDto : UpdateReservationDto){
    const reservation = await this.reservationRepository.findOne({where : {id : id}});
    if(reservation){
      const { date, hour_start, hour_end, category } = reservationDto;

      if (!date || !hour_start || !hour_end) {
        throw new BadRequestException(
          'Reservation Data Incomplete',
        );
      }

      let reservationDate = new Date(date);
      const now = new Date();
      console.log(reservationDate);
      if (isNaN(reservationDate.getTime()) || reservationDate < now) {
        throw new BadRequestException('Invalide Date');
      }

      if (!this.isValidTime(reservationDate, hour_start, hour_end)) {
        throw new BadRequestException(
          "The reservation is outside opening hours",
        );
      }

      if (!this.isValidDuration(hour_start, hour_end)) {
        throw new BadRequestException("The reservation duration is not valid");
      }

      // check if there is a table for the reservation in the chosen time
      const availableTable = await this.avaibleTable(category,date,hour_start,hour_end);
      
      if (!availableTable) {
        throw new NotAcceptableException('No available tables for the selected time and category.');
      }
      
      const newReservation = this.reservationRepository.create(reservationDto);
      newReservation.table = availableTable;
      await this.reservationRepository.update(id,newReservation);
      return await this.reservationRepository.findOne({where : {id : id}});
    }
    else{
      throw new NotFoundException('No reservation has been found');
    }
  }

  async deleteReservation(id: string): Promise<any> {
    const reservationToDelete = await this.reservationRepository.findOne({where : {id : id}})
    if(reservationToDelete){
      await this.reservationRepository.delete(id);
    }
    else{
      throw new NotFoundException('No reservation has been found');
    }
    
  }
}
