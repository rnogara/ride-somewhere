import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from 'src/database/entities/ride.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), HttpModule],
  controllers: [RidesController],
  providers: [RidesService],
})
export class RidesModule {}
