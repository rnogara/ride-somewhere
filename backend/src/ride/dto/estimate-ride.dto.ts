import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class EstimateRideDto {
  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  customer_id: string;

  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  origin: string;

  @IsNotEmpty({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  @IsString({
    message:
      'INVALID_DATA: Os dados fornecidos no corpo da requisição são inválidos',
  })
  destination: string;
}

class CoordinatesDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}

class ReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

class OptionDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  vehicle: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ReviewDto)
  review: ReviewDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;
}

export class EstimateResponseDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  origin: CoordinatesDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  destination: CoordinatesDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  distance: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  @IsNotEmpty()
  @IsObject()
  routeResponse: object;
}
