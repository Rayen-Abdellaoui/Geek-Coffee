import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  category: string;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}


