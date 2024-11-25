import Heading from "../ui/Heading";

export default function LoginWarning() {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-10">
			<Heading level={1} className="text-3xl bg-white/15 rounded-2xl p-5 text-center">Por favor,<br />para uma melhor experiência,<br />faca login ou sign in</Heading>
		</div>
	);
}