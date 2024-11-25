import { cn } from "@/app/lib/utils";

type Props = {
	level: number;
	className: string;
	children: React.ReactNode
}
export default function Heading({ level, className, children }: Props) {
	return (
		<div>
			{level === 1 &&
				<h1 className={cn('text-white text-[3rem]', className)}>
					{children}
				</h1>
			}
			{level === 2 &&
				<h2 className={cn('text-white text-[3rem]', className)}>
					{children}
				</h2>
			}
		</div>
	);
}