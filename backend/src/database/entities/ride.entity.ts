import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ride')
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  distance: number;

  @Column()
  duration: string;

  @Column()
  driver_id: number;

  @Column()
  value: number;

  @Column()
  date: Date;
}
