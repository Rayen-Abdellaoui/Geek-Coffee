import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsString, IsEmail, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Table } from '../../tables/entity/table.entity';
import { Users } from 'src/users/entities/user.entity';
import { ReservationCategoryEnum } from 'src/enums/reservation-category.enus.ts';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'date', nullable: false })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Column({ type: 'time', nullable: false })
  @IsString()
  @IsNotEmpty()
  hour_start: string;

  @Column({ type: 'time', nullable: false })
  @IsString()
  @IsNotEmpty()
  hour_end: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  guests: number;

  @Column({
    type : 'enum',
    enum : ReservationCategoryEnum,
    default : ReservationCategoryEnum.PLAY
  })
  category : string;

  @ManyToOne(
    type => Table,
    (table) => table.reservations,
    {
      cascade : ['insert','update'],
      eager:true,
      nullable:true
    }
  )
  table : Table

  @ManyToOne(
    type => Users,
    (user) => user.reservations,
    {
      cascade : ['insert','update'],
      eager:true,
      nullable:true
    }
  )
  user : Users

}
