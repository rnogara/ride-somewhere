import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  vehicle: string;

  @Column({ name: 'review_rating', type: 'integer' })
  review_rating: number;

  @Column({ name: 'review_comment', type: 'text' })
  review_comment: string;

  @Column({ name: 'fee', type: 'decimal', precision: 10, scale: 2 })
  fee: number;

  @Column({ name: 'min_km', type: 'integer' })
  min_km: number;
}
