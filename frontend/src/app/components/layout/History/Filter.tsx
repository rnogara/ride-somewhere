'use client';
import { Driver } from "@/app/types/driver.type";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
	drivers: Driver[];
	setRides: (rides: []) => void;
};

const formSchema = z.object({
	customerId: z.string().min(1, { message: "Por favor, insira um id" }),
})

export default function Filter({ drivers, setRides }: Props) {
	const [selectedDriver, setSelectedDriver] = useState(0);
	const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const url = selectedDriver !== 0 ? "http://localhost:8080/ride/" + data.customerId + "?driver_id=" + selectedDriver : "http://localhost:8080/ride/" + data.customerId;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				const error = await response.json();
				setRides([]);
				throw new Error(response.status + ": " + error.error_description);
			}
			const responseJson = await response.json();
			setRides(responseJson.rides);
		} catch (error) {
			if (error instanceof Error) {
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

	return (
		<div>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="w-[80%] mx-auto h-fit p-5 rounded-lg flex gap-3">
				<div>
					<Input
						{...register("customerId")}
						type="text"
						placeholder="Id do usuário"
						className="min-w-48 bg-transparent text-white text-xl placeholder:text-xl p-4"
					/>
					{errors.customerId && <span className="text-red-400 p-1">{errors.customerId.message}</span>}
				</div>
				<Select>
					<SelectTrigger className="text-white placeholder:text-white/60 placeholder:text-xl text-xl ">
						<SelectValue placeholder="Selecione um motorista" />
					</SelectTrigger>
					<SelectContent className="bg-zinc-800 text-white">
						<SelectItem value="Nenhum" onClick={() => setSelectedDriver(0)}>Nenhum</SelectItem>
						{drivers.map((driver) => (
							<SelectItem key={driver.id} value={driver.name} onClick={() => setSelectedDriver(driver.id)}>
								{driver.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button type="submit" className="bg-blue-950 hover:bg-blue-900 w-fit m-auto text-xl">Pesquisar</Button>
			</form>
		</div>
	);
}