'use client';
import Image from 'next/image';
import LandingNav from './LandingNav';
import { useState, useEffect } from 'react';

export default function Header() {
	const [showNavBar, setShowNavBar] = useState(false);
	useEffect(() => {
		const hyperlinks =
			document.querySelectorAll('.hyperlink');
		hyperlinks.forEach((link, index) => {
			link.addEventListener('click', () => {
				setShowNavBar(false);
			});
		});
	}, []);
	return (
		<header className="sticky top-0 z-20 flex h-16 w-screen items-center justify-between gap-5 bg-dominant px-16 shadow-md -lg:px-5">
			<button
				className="absolute left-2 md:hidden"
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
			<LandingNav {...{ showNavBar, setShowNavBar }} />
		</header>
	);
}
