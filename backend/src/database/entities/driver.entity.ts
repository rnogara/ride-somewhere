import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  rating: number;

  @Column()
  fee: number;

  @Column()
  minKm: number;
}
