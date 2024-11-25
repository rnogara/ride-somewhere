import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ride')
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  origin: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  destination: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  distance: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  duration: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  driver_id: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @Column()
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
