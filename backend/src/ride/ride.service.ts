import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from 'src/database/entities/ride.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { EstimateResponseDto, EstimateRideDto } from './dto/estimate-ride.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { DriversService } from 'src/drivers/drivers.service';

@Injectable()
export class RideService {
  private readonly apiKey: string;
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly driversService: DriversService,
  ) {
    this.apiKey = this.configService.get<string>('GOOGLE_API_KEY');
  }

  async create(createRideDto: CreateRideDto): Promise<Ride> {
    return await this.rideRepository.save(createRideDto);
  }

  async estimate(
    estimateRideDto: EstimateRideDto,
  ): Promise<EstimateResponseDto> {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    const googleResponse = {};
    const drivers = await this.driversService.findAll();
    const options = [];

    const data = {
      origin: { address: estimateRideDto.origin },
      destination: { address: estimateRideDto.destination },
      travelMode: 'DRIVE',
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': this.apiKey,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      googleResponse['origin'] =
        response.data.routes[0].legs[0].startLocation.latLng;
      googleResponse['destination'] =
        response.data.routes[0].legs[0].endLocation.latLng;
      googleResponse['distance'] = response.data.routes[0].distanceMeters;
      googleResponse['duration'] = parseInt(
        response.data.routes[0].duration.replace('s', ''),
      );
      googleResponse['routeResponse'] = response.data.routes[0].legs;
    } catch (error) {
      console.error('Erro ao estimar rota:', error.message);
      throw error;
    }

    for (const driver of drivers) {
      if (driver.min_km >= googleResponse['distance'] / 1000) {
        options.push({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: {
            rating: driver.review_rating,
            comment: driver.review_comment,
          },
          value: (driver.fee * googleResponse['distance']) / 1000,
        });
      }
    }

    return {
      origin: googleResponse['origin'],
      destination: googleResponse['destination'],
      distance: googleResponse['distance'],
      duration: googleResponse['duration'],
      options,
      routeResponse: googleResponse['routeResponse'],
    };
  }

  async findAll(): Promise<Ride[]> {
    return await this.rideRepository.find();
  }

  async findOne(id: number): Promise<Ride> {
    return await this.rideRepository.findOneBy({ id });
  }
}
