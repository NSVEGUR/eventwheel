import Image from 'next/image';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex min-h-screen min-w-screen relative">
			<div className="absolute inset-0 w-full h-full flex items-center justify-center">
				<Image
					src="/noisy-gradient.png"
					alt="Noisy Gradient"
					fill={true}
					priority={true}
				></Image>
			</div>
			<form className="absolute inset-0 w-full h-full flex flex-col gap-5 items-center justify-center">
				<div className="flex items-center gap-2">
					<Image
						src="/logo.svg"
						width={50}
						height={50}
						alt="Picture of Logo"
					></Image>
					<h1 className="text-3xl font-medium">
						eventmate
					</h1>
				</div>
				{children}
			</form>
		</main>
	);
}
