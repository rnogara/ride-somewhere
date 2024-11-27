import { Driver } from "@/app/types/driver.type";
import Confirm from "./Confirm";

type Props = {
	origin: string,
	destination: string,
	options: Driver[],
	customerId: string,
	distance: number,
	duration: string
}

export default function Options({ origin, destination, options, customerId, distance, duration }: Props) {
	const originUrl = origin.replace(" ", "+").replace(",", "").replace(".", "").replace("-", "");
	const destinationUrl = destination.replace(" ", "+");
	const url = "https://www.google.com/maps/embed/v1/directions?key=" + process.env.NEXT_PUBLIC_GOOGLE_API_KEY + "&origin=" + originUrl + "&destination=" + destinationUrl;
	return (
		<div className="w-full flex flex-col items-center gap-10">
			{origin.length > 0 && destination.length > 0 &&
				<iframe
					width="760"
					height="400"
					frameBorder="0"
					referrerPolicy="no-referrer-when-downgrade"
					src={url}
					allowFullScreen>
				</iframe>
			}
			<Confirm
				options={options}
				customerId={customerId}
				origin={origin}
				destination={destination}
				distance={distance}
				duration={duration}
			/>
		</div>
	);
}