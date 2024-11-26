'use client';
import { useState } from "react";
import History from "./History";
import LoginWarning from "./LoginWarning";
import Options from "./Options";
import Ride from "./Ride";

export default function HomePage({ userId }: { userId: string }) {
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");

	return (
		<div className="w-full flex flex-col items-center gap-10">
			{!userId && <LoginWarning />}
			<Ride />
			<Options origin={origin} destination={destination} />
			<History />
		</div>
	);
}