import LoginWarning from "./LoginWarning";

export default function HomePage({ userId }: { userId: string }) {
	return (
		<div>
			{!userId && <LoginWarning />}
			Enter
		</div>
	);
}