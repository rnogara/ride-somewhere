'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Ride } from "@/app/types/ride.type";
import 'react-toastify/dist/ReactToastify.css';



export default function HistoryTable({ rides }: { rides: Ride[] }) {

	const formatDateTimeWithLocale = (dateString: Date) => {
		const date = new Date(dateString);

		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear().toString().slice(-2);

		return `${hours}:${minutes} ${day}/${month}/${year}`;
	};

	const formatTimeFromSeconds = (input: string): string => {
		const seconds = parseInt(input.replace('s', ''), 10);

		if (isNaN(seconds)) {
			return 'Invalid input';
		}

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		if (hours > 0) {
			return `${hours}h ${minutes}m`;
		} else if (minutes > 0) {
			return `${minutes}m ${remainingSeconds}s`;
		} else {
			return `${remainingSeconds}s`;
		}
	}

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xl">Data</TableHead>
						<TableHead className="text-xl">Motorista</TableHead>
						<TableHead className="text-xl">Origem</TableHead>
						<TableHead className="text-xl">Destino</TableHead>
						<TableHead className="text-xl">Distancia</TableHead>
						<TableHead className="text-xl">Tempo</TableHead>
						<TableHead className="text-xl">Valor</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rides.map((ride: Ride) => (
						<TableRow key={ride.id}>
							<TableCell className="text-xl text-white">{formatDateTimeWithLocale(ride.date)}</TableCell>
							<TableCell className="text-xl text-white">{ride.driver.name}</TableCell>
							<TableCell className="text-xl text-white">{ride.origin}</TableCell>
							<TableCell className="text-xl text-white">{ride.destination}</TableCell>
							<TableCell className="text-xl text-white">{(ride.distance / 1000) + 'km'}</TableCell>
							<TableCell className="text-xl text-white">{formatTimeFromSeconds(ride.duration)}</TableCell>
							<TableCell className="text-xl text-white">R${ride.value.toFixed(2).replace(".", ",")}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}