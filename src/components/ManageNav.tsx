'use client';

import Link from 'next/link';
import Header from '@/components/ManageHeader';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SideMenu({
	children
}: {
	children: React.ReactNode;
}) {
	const path = usePathname();
	const [showNavBar, setShowNavBar] = useState(false);
	const hyperlinks = [
		{
			name: 'Home',
			link: '/',
			active: false,
			icon: () => (
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
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			)
		},
		{
			name: 'Create',
			link: '/manage/create',
			active: path === '/manage/create',
			icon: () => (
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
						d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			)
		},
		{
			name: 'Events',
			link: '/manage',
			active:
				!path.includes('likes') &&
				!path.includes('tickets') &&
				!path.includes('create') &&
				!path.includes('scan'),
			icon: () => (
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
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
					/>
				</svg>
			)
		},
		{
			name: 'Tickets',
			link: '/manage/tickets',
			active: path.includes('tickets'),
			icon: () => (
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
						d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
					/>
				</svg>
			)
		},
		{
			name: 'Scanner',
			link: '/manage/scan',
			active: path.includes('scan'),
			icon: () => (
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
						d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			)
		},
		{
			name: 'Logout',
			link: '/',
			active: false,
			icon: () => (
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
						d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
					/>
				</svg>
			)
		}
	];
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
		<main className="h-screen w-screen overflow-hidden">
			<Header {...{ showNavBar, setShowNavBar }} />
			<section className="h-[calc(100vh-theme(spacing.16)) flex w-full">
				<nav
					className={`h-screen w-16 border-r-[1px] border-base bg-dominant -lg:fixed -lg:z-50 -lg:w-2/3 ${
						showNavBar
							? '-lg:-translate-x-0'
							: '-lg:-translate-x-full'
					}  overflow-hidden transition-all duration-300`}
				>
					<ul className="mt-5 flex h-full w-full flex-col items-start gap-3 p-3 text-accent">
						{hyperlinks.map((hyperlink, index) => {
							const Icon = hyperlink.icon;
							return (
								<li key={index}>
									<Link
										className={`group relative flex w-full items-center justify-center gap-2 rounded-2xl p-2 -lg:justify-start ${
											hyperlink.active &&
											'bg-accent text-skin-inverted'
										} hyperlink transition-all duration-300 hover:rounded-lg hover:bg-accent hover:text-skin-inverted`}
										href={hyperlink.link}
									>
										<Icon />
										<span className="fixed left-[70px] z-50 hidden w-32 animate-scale rounded bg-accent p-1 text-center text-skin-inverted before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:border-[6px] before:border-transparent before:border-r-accent before:content-[''] group-hover:block -lg:group-hover:hidden">
											{hyperlink.name}
										</span>
										<span className="lg:hidden">
											{hyperlink.name}
										</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<section className="relative h-[calc(100vh-theme(spacing.16))] w-[calc(100vw-theme(spacing.16))] -lg:w-screen">
					{children}
				</section>
			</section>
		</main>
	);
}
