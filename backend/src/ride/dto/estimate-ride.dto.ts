export class EstimateRideDto {
  customerId: number;
  origin: string;
  destination: string;
}

export class EstimateResponseDto {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: number;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
  routeResponse: object;
}
