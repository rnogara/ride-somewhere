import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  vehicle: string;

  @Column({ name: 'review_rating', type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  review_rating: number;

  @Column({ name: 'review_comment', type: 'text' })
  @IsNotEmpty()
  @IsString()
  review_comment: string;

  @Column({ name: 'fee', type: 'decimal', precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  fee: number;

  @Column({ name: 'min_km', type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  min_km: number;
}
