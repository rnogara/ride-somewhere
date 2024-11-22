import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from 'src/database/entities/ride.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { EstimateRideDto } from './dto/estimate-ride.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
    private readonly httpService: HttpService,
  ) {}

  async create(createRideDto: CreateRideDto): Promise<Ride> {
    return await this.ridesRepository.save(createRideDto);
  }

  async estimate(estimateRideDto: EstimateRideDto): Promise<any> {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const data = {
      origin: { address: estimateRideDto.origin },
      destination: { address: estimateRideDto.destination },
      travelMode: 'DRIVE',
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data; // Retorna os dados da API
    } catch (error) {
      console.error(
        'Erro ao estimar rota:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async findAll(): Promise<Ride[]> {
    return await this.ridesRepository.find();
  }

  async findOne(id: number): Promise<Ride> {
    return await this.ridesRepository.findOneBy({ id });
  }
}
