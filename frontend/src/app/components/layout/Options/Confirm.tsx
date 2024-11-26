'use client';
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import React, { useState } from "react";
import Heading from "../../ui/Heading";
import { Driver } from "@/app/types/driver.type";
import DriverCard from "./DriverCard";
import { useRouter } from "next/navigation";

type ConfirmBody = {
	customer_id: string;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: {
		id: number;
		name: string;
	};
	value: number;
};

type Props = {
	customerId: string;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	options: Driver[];
};

export default function Confirm({ customerId, origin, destination, distance, duration, options }: Props) {
	const [driver, setDriver] = useState({ id: 0, name: "", value: 0 });
	const [confirmed, setConfirmed] = useState(false);
	const { handleSubmit } = useForm();
	const router = useRouter();

	const onSubmit = async () => {
		const data: ConfirmBody = {
			customer_id: customerId,
			origin: origin,
			destination: destination,
			distance: distance,
			duration: duration + 's',
			driver: {
				id: driver.id,
				name: driver.name,
			},
			value: driver.value
		}
		await fetch("http://localhost:8080/ride/confirm", {
			method: "POST", body: JSON.stringify(data), headers: {
				'Content-Type': 'application/json',
			}
		}).then((res) => res.json()).catch((err) => console.log(err));
		setConfirmed(true);
		router.push("/#history");
	};

	return (
		<div className="w-full mx-auto">
			{options.length > 0 && (
				<>
					<Heading level={2} className="text-center">Confirmar viagem</Heading>
					<form onSubmit={handleSubmit(onSubmit)} className="w-full h-fit flex flex-col items-center rounded-lg gap-3">
						<div className="w-full h-fit flex flex-nowrap justify-evenly px-3 py-5">
							{options.length > 0 && options.map(
								(option, index) => <div key={index}>
									{
										<DriverCard option={option} setDriver={setDriver} />
									}</div>
							)}
						</div>
						<Button
							disabled={driver.id === 0 || confirmed}
							type="submit"
							className="w-fit text-2xl p-8 bg-blue-950 hover:bg-blue-900 disabled:bg-zinc-900"
						>Confirmar viagem</Button>
					</form>
				</>
			)}
		</div>
	);
}