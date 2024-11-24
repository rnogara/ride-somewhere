import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Driver } from './entities/driver.entity';
import { Ride } from './entities/ride.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'root',
        password: 'password',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: false,
        entities: [User, Driver, Ride],
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
