import Image from 'next/image';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="h-screen w-screen overflow-scroll bg-[url('/noisy-gradient.png')]  bg-cover p-10">
			<form className="flex h-full w-full flex-col items-center gap-5">
				{children}
			</form>
		</main>
	);
}
