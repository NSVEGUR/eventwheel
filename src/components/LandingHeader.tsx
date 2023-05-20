'use client';
import Image from 'next/image';
import LandingNav from './LandingNav';
import { useState } from 'react';

export default function Header() {
	const [showNavBar, setShowNavBar] = useState(true);
	return (
		<header className="sticky top-0 z-20 flex h-16 w-screen items-center justify-between gap-5 bg-dominant px-16 shadow-md -lg:px-5">
			<button
				className="absolute left-2 lg:hidden"
				onClick={() => {
					setShowNavBar(!showNavBar);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
			<div className="flex items-center justify-center gap-3 -md:ml-8 ">
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
			<div className="flex h-10 w-96 items-center gap-2 rounded-md border-[1px] border-base p-2 -xl:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-5 w-5"
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
				<div className="flex items-center gap-1 pr-2 text-sm">
					<span className="flex h-6 w-6 items-center justify-center rounded border-[1px] border-base">
						<Image
							src="/command.svg"
							alt="Picture of Command Key"
							width={10}
							height={10}
						></Image>
					</span>
					<span className="flex h-6 w-6 items-center justify-center rounded border-[1px] border-base">
						K
					</span>
				</div>
			</div>
			<LandingNav {...{ showNavBar, setShowNavBar }} />
		</header>
	);
}
