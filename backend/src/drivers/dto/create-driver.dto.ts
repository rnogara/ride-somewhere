import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ReviewDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  car: string;

  @ValidateNested()
  @Type(() => ReviewDto)
  review: ReviewDto;

  @IsNumber()
  @IsPositive()
  fee: number;

  @IsNumber()
  @IsPositive()
  min_km: number;
}
