'use client';
import { useState } from "react";
import History from "./History";
import Options from "./Options";
import Ride from "./Ride";

export default function HomePage() {
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [options, setOptions] = useState([]);

	return (
		<div className="w-full flex flex-col items-center gap-10">
			<Ride setOrigin={setOrigin} setDestination={setDestination} setOptions={setOptions} />
			<Options origin={origin} destination={destination} options={options} />
			<History />
		</div>
	);
}