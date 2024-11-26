import Heading from "../../ui/Heading";
import Login from "../Login";
import Menu from "./Menu";
import SignIn from "../SignIn";

export default function Header({ userId }: { userId: string }) {
	return (
		<header className="h-20 w-full relative mb-3 bg-white/10 z-50">
			<div className="absolute top-0 left-0 h-full w-full flex justify-between items-center px-8">
				<Heading level={1} className="text-[2rem]">Bem vindo(a)!</Heading>
				{userId.length > 0 ?
					<Menu /> :
					(
						<div className="flex gap-6">
							<SignIn />
							<Login />
						</div>
					)}
			</div>
		</header>
	);
}