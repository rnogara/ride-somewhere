import { Driver } from 'src/database/entities/driver.entity';
import { User } from 'src/database/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  customerId: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @ManyToOne(() => Driver, (driver) => driver.id)
  driver: {
    id: number;
    name: string;
  };

  @Column()
  value: number;
}
