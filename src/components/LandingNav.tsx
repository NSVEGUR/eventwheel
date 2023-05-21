'use client';

import Link from 'next/link';
import { useAuth } from './providers/supabase-auth-provider';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
	showNavBar: Boolean;
	setShowNavBar: Dispatch<SetStateAction<boolean>>;
}

export default function Nav({
	showNavBar,
	setShowNavBar
}: Props) {
	const { user, signOut } = useAuth();
	const path = usePathname();
	const hyperlinks = [
		{
			name: 'Home',
			path: '/',
			active: path === '/'
		},
		{
			name: 'Create',
			path: '/manage/create',
			active: false
		},
		{
			name: 'Manage',
			path: '/manage',
			active: false
		},
		{
			name: 'Wishlist',
			path: '/wishlist',
			active: path === '/wishlist'
		},
		{
			name: 'Tickets',
			path: '/tickets',
			active: path === '/tickets'
		}
	];
	useEffect(() => {}, []);
	return (
		<ul
			className={`flex h-full items-center gap-10 bg-dominant -md:fixed -md:left-0 -md:top-16 -md:z-[999] -md:h-screen -md:w-screen -md:flex-col -md:overflow-hidden
				${
					showNavBar
						? '-md:-translate-x-full'
						: '-md:-translate-x-0'
				}
				 transition-all duration-300`}
		>
			{hyperlinks.map((link, index) => {
				return (
					<li
						key={index}
						className={`rounded-md ${
							link.active &&
							'bg-accent px-2 py-1 font-medium text-skin-inverted'
						}`}
					>
						<Link href={link.path}>{link.name}</Link>
					</li>
				);
			})}
			<li>
				{user ? (
					<button
						className="flex items-center gap-2 rounded-md border-[1px] border-base bg-complementary p-1 text-skin-inverted"
						onClick={() => {
							signOut();
						}}
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
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
						<span className="text-sm">Logout</span>
					</button>
				) : (
					<Link
						href="/signin"
						className="flex items-center gap-2 rounded-md border-[1px] border-base bg-accent p-1 text-skin-inverted"
					>
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
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
							/>
						</svg>
						<span>Sign In</span>
					</Link>
				)}
			</li>
		</ul>
	);
}
