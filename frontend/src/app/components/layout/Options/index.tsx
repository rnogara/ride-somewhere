import { Driver } from "@/app/types/driver.type";
import DriverCard from "./DriverCard";

type Props = {
	origin: string,
	destination: string,
	options: Driver[],
}

export default function Options({ origin, destination, options }: Props) {
	const originUrl = origin.replace(" ", "+").replace(",", "").replace(".", "").replace("-", "");
	const destinationUrl = destination.replace(" ", "+");
	const url = "https://www.google.com/maps/embed/v1/directions?key=" + process.env.NEXT_PUBLIC_GOOGLE_API_KEY + "&origin=" + originUrl + "&destination=" + destinationUrl;
	return (

		<div>
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
			{options.length > 0 && options.map((option, index) => <div key={index} className="w-full flex justify-between px-20 py-5">{
				<DriverCard option={option} />}</div>)}
		</div>
	);
}