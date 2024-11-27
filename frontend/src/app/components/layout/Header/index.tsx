'use client';
import { useEffect, useState } from "react";
import Heading from "../../ui/Heading";
import Menu from "./Menu";

export default function Header() {
	const [isPageScrolled, setIsPageScrolled] = useState(false);

	useEffect(() => {
		const checkScroll = () => {
			setIsPageScrolled(window.scrollY !== 0);
		};
		window.addEventListener("scroll", checkScroll);

		return () => {
			window.removeEventListener("scroll", checkScroll);
		};
	}, [isPageScrolled]);

	return (
		<header className="relative z-50">
			<div className="fixed top-0 left-0 h-20 w-full flex justify-between items-center px-8 mb-3 bg-zinc-600/70 ">
				<Heading level={1} className="text-[2rem]">Bem vindo(a)!</Heading>
				<Menu />
			</div>
		</header>
	);
}