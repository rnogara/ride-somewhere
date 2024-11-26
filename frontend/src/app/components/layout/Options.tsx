type Props = {
	origin: string,
	destination: string
}

export default function Options({ origin, destination }: Props) {
	const originUrl = origin.replace(" ", "+");
	const destinationUrl = destination.replace(" ", "+");
	const url = "https://www.google.com/maps/embed/v1/directions?key=" + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY + "&origin=" + originUrl + "&destination=" + destinationUrl;
	return (

		<div>
			<iframe
				width="450"
				height="250"
				frameBorder="0"
				referrerPolicy="no-referrer-when-downgrade"
				src={url}
				allowFullScreen>
			</iframe>
		</div>
	);
}