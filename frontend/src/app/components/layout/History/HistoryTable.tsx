'use client';
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Ride } from "@/app/types/ride.type";
import { ToastContainer, toast } from "react-toastify";
import Heading from "../../ui/Heading";
import 'react-toastify/dist/ReactToastify.css';


type Props = {
	customerId: string;
	driverId: number;
}

export default function HistoryTable({ customerId, driverId }: Props) {
	const [rides, setRides] = useState([]);
	useEffect(() => {
		const history = async () => {
			const url = driverId !== 0 ? "http://localhost:8080/ride/" + customerId + "?driver_id=" + driverId : "http://localhost:8080/ride/" + customerId;
			try {
				const response = await fetch(url);
				console.log(response);

				if (!response.ok) {
					const error = await response.json();
					throw new Error(response.status + ": " + error.error_description);
				}
				const responseJson = await response.json();
				return responseJson.rides;
			} catch (error) {
				if (error instanceof Error) {
					console.log(error);

					toast.error(error.message, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
				}
			}
		}
		history().then((rides) => setRides(rides));
	}, [customerId, driverId]);

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
			<ToastContainer />
			{
				rides && rides.length > 0 ? (
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
				) : (
					<Heading level={3} className="text-center">Nenhuma viagem encontrada</Heading>
				)
			}
		</div>
	);
}