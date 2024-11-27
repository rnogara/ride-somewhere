import { specialElite } from "@/app/fonts";
import Link from "next/link";

export default function Menu() {
	return (
		<div className="ml-3 flex gap-6">
			<Link href="/" className={`${specialElite.className} hover:underline text-white text-2xl`}>Home</Link>
			<Link href="/#ride" className={`${specialElite.className} hover:underline text-white text-2xl`}>Solicitar viagem</Link>
			<Link href="/#history" className={`${specialElite.className} hover:underline text-white text-2xl`}>Histórico</Link>
		</div>
	);
}