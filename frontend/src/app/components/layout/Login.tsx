'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const formSchema = z.object({
	email: z.string().email({ message: "Por favor, insira um email" }),
	password: z.string().min(4, { message: "Por favor, insira uma senha" })
})

interface User {
	email: string;
	password: string;
}

export default function Login() {
	const router = useRouter();
	const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	})

	const onSubmit = async (data: User) => {
		const users = await fetch("http://localhost:8080/users", { method: "GET" }).then((res) => res.json()).catch((err) => console.log(err));
		const user = users.find((user: User) => user.email === data.email && user.password === data.password);
		if (!user) {
			return alert("Usuário não encontrado");
		}
		localStorage.setItem("userId", user.id.toString());
		router.refresh();
	}

	return (
		<Dialog>
			<DialogTrigger className="bg-transparent hover:underline text-white text-2xl">Login</DialogTrigger>
			<DialogContent className="bg-zinc-900 border border-black">
				<DialogHeader>
					<DialogTitle className="text-white font-semibold">Login</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full h-fit p-5 rounded-lg flex flex-col gap-3">
					<div>
						<Input {...register("email")} type="email" placeholder="Email" className="bg-transparent text-white" />
						{errors.email && <span className="text-red-400 p-1">{errors.email.message}</span>}
					</div>
					<div>
						<Input {...register("password")} type="password" placeholder="Password" className="bg-transparent text-white" />
						{errors.password && <span className="text-red-400 p-1">{errors.password.message}</span>}
					</div>
					<Button type="submit" className="bg-blue-950 hover:bg-blue-900 w-[50%] m-auto">Login</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}