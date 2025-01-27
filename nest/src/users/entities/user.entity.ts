import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsEmail, IsNotEmpty, MinLength} from 'class-validator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Exclude } from 'class-transformer';
import { Reservation } from 'src/reservations/entity/reservation.entity';


@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 20, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ length: 30, nullable: false })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @Column({ length: 20, nullable: false })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Column({ 
    length: 100, 
    nullable: false,
    unique: true
  })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @Column()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    type : 'enum',
    enum : UserRoleEnum,
    default : UserRoleEnum.USER
  })
  role : string;

  @Column()
  @Exclude()
  salt : string;

  @OneToMany(
    type => Reservation,
    (reservation) => reservation.user,
    {
      cascade : true,
      nullable:true
    }
  )
  reservations : Reservation[];
}
