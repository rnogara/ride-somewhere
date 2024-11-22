import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from 'src/database/entities/ride.entity';
import { Repository } from 'typeorm';
import { EstimateRideDto } from './dto/estimate-ride.dto';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
  ) {}

  async create(createRideDto: CreateRideDto): Promise<Ride> {
    return await this.ridesRepository.save(createRideDto);
  }

  estimate(estimateRideDto: EstimateRideDto) {
    return `estimativa aqui ${estimateRideDto}`;
  }

  async findAll(): Promise<Ride[]> {
    return await this.ridesRepository.find();
  }

  async findOne(id: number): Promise<Ride> {
    return await this.ridesRepository.findOneBy({ id });
  }
}
