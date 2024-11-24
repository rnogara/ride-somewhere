import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { Response } from 'express';
import { EstimateRideDto } from './dto/estimate-ride.dto';
import { DriversService } from 'src/drivers/drivers.service';
@Controller('ride')
export class RideController {
  constructor(
    private readonly rideService: RideService,
    private readonly driversService: DriversService,
  ) {}

  @Post('confirm')
  async create(@Body() createRideDto: CreateRideDto, @Res() res: Response) {
    const driver = await this.driversService.findOne(createRideDto.driver.id);
    if (!driver) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Motorista não encontrado',
      });
    }
    if (createRideDto.distance / 1000 < driver.min_km) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        error_code: 'INVALID_DISTANCE',
        error_description: 'Quilometragem inválida para o motorista',
      });
    }
    try {
      await this.rideService.create(createRideDto);
      return res.status(HttpStatus.CREATED).json({ success: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: 'INVALID_DATA',
        error_description:
          'Os dados fornecidos no corpo da requisição são inválidos',
      });
    }
  }

  @Post('estimate')
  async estimate(
    @Body() estimateRideDto: EstimateRideDto,
    @Res() res: Response,
  ) {
    try {
      const estimate = await this.rideService.estimate(estimateRideDto);
      return res.status(HttpStatus.OK).json(estimate);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: 'INVALID_DATA',
        error_description:
          'Os dados fornecidos no corpo da requisição são inválidos',
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Query('driver_id') driver_id?: string,
  ) {
    if (driver_id) {
      const driver = await this.driversService.findOne(+driver_id);
      if (!driver) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error_code: 'INVALID_DRIVER',
          error_description: 'Motorista invalido',
        });
      }
    }
    const rides = await this.rideService.findAll(id, +driver_id);
    if (!rides) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error_code: 'NO_RIDES_FOUND',
        error_description: 'Nenhum registro encontrado',
      });
    }
    return res.status(HttpStatus.OK).json(rides);
  }
}
