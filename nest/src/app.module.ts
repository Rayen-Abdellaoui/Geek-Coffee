import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservations/reservation.module';
import {TableModule} from './tables/table.module';
import { Table } from './tables/entity/table.entity';
import { Reservation } from './reservations/entity/reservation.entity';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5433,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'rayen123',
    database: process.env.DATABASE_NAME || 'geek_coffee',
    entities: [Table,Reservation,Users],
    synchronize: true,
  }),
  ReservationModule,
  TableModule,
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
