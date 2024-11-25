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
import { CustomerRidesResponseDto } from './dto/customer-rides.dto';

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
    const ride = {
      customer_id: createRideDto.customer_id,
      origin: createRideDto.origin,
      destination: createRideDto.destination,
      distance: createRideDto.distance,
      duration: createRideDto.duration,
      driver_id: createRideDto.driver.id,
      value: createRideDto.value,
      date: new Date(),
    };
    return await this.rideRepository.save(ride);
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
      if (driver.min_km <= googleResponse['distance'] / 1000) {
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
      options: options.sort((a, b) => a.value - b.value),
      routeResponse: googleResponse['routeResponse'],
    };
  }

  async findAll(
    id: string,
    driver_id?: number,
  ): Promise<CustomerRidesResponseDto> {
    const rides = [];
    const drivers = await this.driversService.findAll();

    const foundRides = await this.rideRepository.find({
      where: {
        customer_id: id,
        ...(driver_id && { driver_id }),
      },
    });
    if (foundRides.length === 0) {
      return null;
    }

    foundRides.forEach((ride) => {
      const driver = drivers.find((driver) => driver.id === ride.driver_id);
      rides.push({
        id: ride.id,
        date: ride.date,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: ride.value,
      });
    });

    return {
      customer_id: id,
      rides,
    };
  }
}
