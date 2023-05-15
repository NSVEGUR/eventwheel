import Image from 'next/image';
import LandingNav from './LandingNav';

export default function Header() {
	return (
		<header className="fixed z-50 top-0 h-16 w-full bg-dominant shadow-md flex gap-5 items-center justify-between px-16">
			<div className="flex gap-3 items-center justify-center">
				<Image
					src="/logo.svg"
					alt="Picture of Logo"
					width={30}
					height={30}
				></Image>
				<span className="text-2xl font-medium">
					Eventmate
				</span>
			</div>
			<div className="w-96 h-10 p-2 rounded-md border-[1px] border-base flex gap-2 items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
				<input
					type="text"
					name="search"
					placeholder="Search Events"
					className="flex-grow bg-transparent outline-none"
				/>
				<div className="flex text-sm items-center pr-2 gap-1">
					<span className="border-[1px] border-base rounded w-6 h-6 flex items-center justify-center">
						<Image
							src="/command.svg"
							alt="Picture of Command Key"
							width={10}
							height={10}
						></Image>
					</span>
					<span className="border-[1px] border-base w-6 h-6 flex items-center justify-center rounded">
						K
					</span>
				</div>
			</div>
			<LandingNav />
		</header>
	);
}
