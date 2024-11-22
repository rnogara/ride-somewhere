import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  car: string;

  @Column()
  rating: string;

  @Column()
  fee: number;

  @Column()
  minKm: number;
}
