'use client';
import { useEffect, useState } from "react";
import Filter from "./Filter";
import HistoryTable from "./HistoryTable";
import Heading from "../../ui/Heading";

export default function History() {
	const [customerId, setCustomerId] = useState("");
	const [driverId, setDriverId] = useState(0);
	const [drivers, setDrivers] = useState([]);
	useEffect(() => {
		const drivers = async () => {
			const response = await fetch("http://localhost:8080/drivers").then((res) => res.json()).catch((err) => console.log(err));
			return response;
		}
		drivers().then((drivers) => setDrivers(drivers));
	}, []);
	return (
		<div id="history" className="w-full flex flex-col p-5">
			<Heading level={2} className="text-center">Histórico de viagens</Heading>
			<Filter drivers={drivers} setCustomerId={setCustomerId} setDriverId={setDriverId} />
			{customerId.length > 0 && <HistoryTable customerId={customerId} driverId={driverId} />}
		</div>
	);
}