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
	}
};

export default function DriverCard({ option }: Props) {
	const price = option.value.toFixed(2).replace(".", ",");
	return (
		<div className="flex flex-col gap-5 items-center bg-zinc-800 p-5 rounded-lg">
			<Heading level={3} className="text-center">{option.name}</Heading>
			<p className="text-white text-xl max-w-80">{option.description}</p>
			<p className="text-white text-xl max-w-80">{option.vehicle}</p>
			<p className="text-white text-xl max-w-80 text-left">{option.review.rating} / 5</p>
			<p className="text-white text-xl max-w-80">{option.review.comment}</p>
			<p className="text-white text-xl max-w-80">Preço da viagem: R$ {price}</p>
		</div>
	);
}