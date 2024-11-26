import { Button } from "../../ui/button";
import Heading from "../../ui/Heading";

type Props = {
	option: {
		id: number;
		name: string;
		description: string;
		vehicle: string;
		review: {
			rating: number;
			comment: string;
		};
		value: number;
	},
	setDriver: ({ id, name, value }: { id: number; name: string; value: number; }) => void
};

export default function DriverCard({ option, setDriver }: Props) {
	const price = option.value.toFixed(2).replace(".", ",");
	return (
		<div className="flex flex-col h-full justify-between gap-5 bg-zinc-800 p-5 rounded-lg max-w-72">
			<Heading level={3} className="text-center">{option.name}</Heading>
			<p className="text-white text-xl">{option.description}</p>
			<p className="text-white text-xl">Carro: {option.vehicle}</p>
			<div>
				<p className="text-white text-2xl">Avaliação</p>
				<p className="text-white text-xl">{option.review.rating} / 5</p>
				<p className="text-white text-xl">{option.review.comment}</p>
			</div>
			<p className="text-white text-xl font-bold">Preço da viagem: R$ {price}</p>
			<Button
				type="button"
				onClick={() => setDriver({ id: option.id, name: option.name, value: option.value })}
				className="bg-green-950 hover:bg-emerald-900 mx-auto"
			>Escolher</Button>
		</div>
	);
}