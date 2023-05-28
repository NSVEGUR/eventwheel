import Image from 'next/image';

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
				<div className="flex items-center gap-2">
					<Image
						src="/logo.svg"
						width={50}
						height={50}
						alt="Picture of Logo"
					></Image>
					<h1 className="text-3xl font-medium">
						eventwheel
					</h1>
				</div>
				{children}
			</form>
		</main>
	);
}
