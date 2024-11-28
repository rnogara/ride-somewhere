import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DriverDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class RideDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsDate()
  @Type(() => Date) // Necessário para conversão correta do tipo
  date: Date;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @IsPositive()
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @ValidateNested()
  @Type(() => DriverDto)
  driver: DriverDto;

  @IsNumber()
  @IsPositive()
  value: number;
}

export class CustomerRidesResponseDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RideDto)
  rides: RideDto[];
}
