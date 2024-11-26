'use client';
import { useState } from "react";
import History from "./History";
import Options from "./Options";
import Ride from "./Ride";

export default function HomePage() {
	const [customerId, setCustomerId] = useState("");
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [distance, setDistance] = useState(0);
	const [duration, setDuration] = useState("");
	const [options, setOptions] = useState([]);

	return (
		<div className="w-full flex flex-col items-center gap-10">
			<Ride setOrigin={setOrigin} setDestination={setDestination} setOptions={setOptions} setCustomerId={setCustomerId} setDistance={setDistance} setDuration={setDuration} />
			<Options origin={origin} destination={destination} options={options} customerId={customerId} distance={distance} duration={duration} />
			<History customerId={customerId} />
		</div>
	);
}