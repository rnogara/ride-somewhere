export class CreateDriverDto {
  name: string;
  description: string;
  car: string;
  review: {
    rating: number;
    comment: string;
  };
  fee: number;
  min_km: number;
}
