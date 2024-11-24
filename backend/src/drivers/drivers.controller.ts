import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Response } from 'express';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto, @Res() res: Response) {
    const driver = await this.driversService.create(createDriverDto);
    return res.status(HttpStatus.CREATED).json(driver);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const drivers = await this.driversService.findAll();
    return res.status(HttpStatus.OK).json(drivers);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const driver = await this.driversService.delete(+id);
    return res.status(HttpStatus.OK).json(driver);
  }
}
