import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from 'src/database/entities/ride.entity';
import { HttpModule } from '@nestjs/axios';
import { DriversModule } from 'src/drivers/drivers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), HttpModule, DriversModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RidesModule {}
