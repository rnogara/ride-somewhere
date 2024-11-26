'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React from "react";
import Heading from "../ui/Heading";

const formSchema = z.object({
	customer_id: z.string().min(1, { message: "Por favor, insira um id" }),
	origin: z.string().min(10, { message: "Por favor, insira um endereço válido, com rua número e bairro" }),
	destination: z.string().min(10, { message: "Por favor, insira um endereço válido, com rua número e bairro" }),
});



type Props = {
	setOrigin: (origin: string) => void;
	setDestination: (origin: string) => void;
	setOptions: (options: []) => void;
	setCustomerId: (customerId: string) => void;
	setDistance: (distance: number) => void;
	setDuration: (duration: string) => void;
};

export default function Ride({ setOrigin, setDestination, setOptions, setCustomerId, setDistance, setDuration }: Props) {
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const response = await fetch("http://localhost:8080/ride/estimate", {
			method: "POST", body: JSON.stringify(data), headers: {
				'Content-Type': 'application/json',
			}
		}).then((res) => res.json()).catch((err) => console.log(err));
		setOrigin(data.origin);
		setDestination(data.destination);
		setOptions(response.options);
		setCustomerId(data.customer_id);
		setDistance(response.distance);
		setDuration(response.duration);
	};

	return (
		<div className="w-[50%] mx-auto mt-30">
			<Heading level={2} className="text-center">Solicite sua viagem</Heading>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full h-fit p-5 rounded-lg flex flex-col gap-3">
				<div>
					<Input {...register("customer_id")} type="text" placeholder="Id do usuário" className="bg-transparent text-white text-xl placeholder:text-xl p-4 w-full" />
					{errors.customer_id && <span className="text-red-400 p-1">{errors.customer_id.message}</span>}
				</div>
				<div>
					<Input {...register("origin")} type="text" placeholder="Origem" className="bg-transparent text-white text-xl placeholder:text-xl p-4" />
					{errors.origin && <span className="text-red-400 p-1">{errors.origin.message}</span>}
				</div>
				<div>
					<Input {...register("destination")} type="text" placeholder="Destino" className="bg-transparent text-white text-xl placeholder:text-xl p-4" />
					{errors.destination && <span className="text-red-400 p-1">{errors.destination.message}</span>}
				</div>
				<Button type="submit" disabled={isSubmitting} className="bg-blue-950 hover:bg-blue-900 w-fit m-auto text-xl">{isSubmitting ? "Calculando..." : "Estimar preço"}</Button>
			</form>
		</div>
	);
}