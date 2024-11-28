'use client';
import { useEffect, useState } from "react";
import Filter from "./Filter";
import HistoryTable from "./HistoryTable";
import Heading from "../../ui/Heading";

export default function History() {
	const [drivers, setDrivers] = useState([]);
	const [rides, setRides] = useState([]);
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
			<Filter drivers={drivers} setRides={setRides} />
			{rides.length > 0 ? <HistoryTable rides={rides} /> : <Heading level={3} className="text-center">Nenhuma viagem encontrada</Heading>}
		</div>
	);
}