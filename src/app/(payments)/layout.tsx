import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-w-screen relative flex min-h-screen">
			<div className="absolute inset-0 flex h-full w-full items-center justify-center">
				<Image
					src="/noisy-gradient.png"
					alt="Noisy Gradient"
					fill={true}
					priority={true}
				></Image>
			</div>
			<form className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5">
				{children}
			</form>
		</main>
	);
}
