export type Ride = {
	id: number;
	date: Date;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: {
		id: number;
		name: string;
	};
	value: number;
}

export type Rides = {
	customer_id: string;
	rides: Ride[];
};