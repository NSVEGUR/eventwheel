'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EventNav({
	id,
	children
}: {
	id: string;
	children: React.ReactNode;
}) {
	const path = usePathname();
	const [showNavBar, setShowNavBar] = useState(false);
	const hyperlinks = [
		{
			name: 'Basic Info',
			link: `/manage/${id}/basic`,
			active: path === `/manage/${id}/basic`
		},
		{
			name: 'Details',
			link: `/manage/${id}/details`,
			active: path === `/manage/${id}/details`
		},
		{
			name: 'Tickets',
			link: `/manage/${id}/tickets`,
			active: path.includes(`/manage/${id}/tickets`)
		},
		{
			name: 'Publish',
			link: `/manage/${id}/publish`,
			active: path === `/manage/${id}/publish`
		}
	];
	useEffect(() => {
		const hyperlinks =
			document.querySelectorAll('.eventLink');
		hyperlinks.forEach((link, index) => {
			link.addEventListener('click', () => {
				setShowNavBar(false);
			});
		});
	});
	return (
		<>
			<button
				className="fixed right-20 top-5 lg:hidden"
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
						d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
					/>
				</svg>
			</button>
			<div className="flex h-full w-full overflow-hidden">
				<nav
					className={`flex h-screen w-56 border-r-[1px] border-base bg-dominant -lg:fixed -lg:z-20 -lg:h-screen -lg:w-full 
						${
							showNavBar
								? ' -lg:translate-y-0'
								: ' -lg:translate-y-full'
						} transition-all duration-300`}
				>
					<ul className="flex w-full flex-col gap-2">
						<li>
							<Link
								href="/manage"
								className="eventLink flex items-center gap-2 bg-muted-hover p-2 text-complementary hover:underline"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-4 w-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 19.5L8.25 12l7.5-7.5"
									/>
								</svg>
								Events
							</Link>
						</li>
						<li className="p-2 text-2xl font-medium text-accent">
							<Link
								href={`/manage/${id}`}
								className="eventLink flex items-center hover:text-complementary"
							>
								Dashboard
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
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</Link>
						</li>
						<li>
							<Link
								href={`/${id}`}
								className="eventLink flex items-center gap-2 p-2 text-sm text-complementary hover:underline"
							>
								Preview{' '}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-4 w-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
							</Link>
						</li>
						<li className="flex flex-col">
							{hyperlinks.map((hyperlink, index) => {
								return (
									<Link
										href={hyperlink.link}
										className={`eventLink flex gap-2 p-2  ${
											hyperlink.active
												? 'bg-muted-hover'
												: 'hover:bg-muted'
										}`}
										key={index}
									>
										<span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm text-skin-inverted">
											{index + 1}
										</span>
										<span>{hyperlink.name}</span>
									</Link>
								);
							})}
						</li>
					</ul>
				</nav>
				<div className="h-full w-[calc(100vw-theme(spacing.72))] -lg:w-full">
					{children}
				</div>
			</div>
		</>
	);
}
