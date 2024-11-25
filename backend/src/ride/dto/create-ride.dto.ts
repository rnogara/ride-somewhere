import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DriverDto {
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsNumber()
  @IsPositive({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateRideDto {
  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  customer_id: string;

  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  origin: string;

  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  destination: string;

  @IsNumber()
  @IsPositive({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  distance: number;

  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  duration: string;

  @ValidateNested()
  @Type(() => DriverDto)
  driver: DriverDto;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  value: number;
}
