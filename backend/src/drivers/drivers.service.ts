import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/database/entities/driver.entity';
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
    return await this.driversRepository.find();
  }
}
