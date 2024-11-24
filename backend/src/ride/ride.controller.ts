import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { Response } from 'express';
import { EstimateRideDto } from './dto/estimate-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('confirm')
  async create(@Body() createRideDto: CreateRideDto, @Res() res: Response) {
    const ride = await this.rideService.create(createRideDto);
    return res.status(HttpStatus.CREATED).json(ride);
  }

  @Post('estimate')
  async estimate(
    @Body() estimateRideDto: EstimateRideDto,
    @Res() res: Response,
  ) {
    const estimate = await this.rideService.estimate(estimateRideDto);
    return res.status(HttpStatus.OK).json(estimate);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const rides = await this.rideService.findAll();
    return res.status(HttpStatus.OK).json(rides);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const ride = await this.rideService.findOne(+id);
    return res.status(HttpStatus.OK).json(ride);
  }
}
