import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../database/entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    return await this.driversRepository.save(createDriverDto);
  }

  async findAll() {
    const drivers = await this.driversRepository.find({
      select: [
        'id',
        'name',
        'description',
        'vehicle',
        'review_rating',
        'review_comment',
        'fee',
        'min_km',
      ],
    });
    return drivers;
  }

  async findOne(id: number): Promise<Driver> {
    return await this.driversRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return await this.driversRepository.delete(id);
  }
}
