'use client';

import Link from 'next/link';
import { useAuth } from './providers/supabase-auth-provider';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	showNavBar: Boolean;
	setShowNavBar: Dispatch<SetStateAction<boolean>>;
}

export default function Nav({
	showNavBar,
	setShowNavBar
}: Props) {
	const { user, signOut } = useAuth();
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
			<li className="font-medium text-complementary">
				<Link href="/manage/create">Create</Link>
			</li>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/wishlist">Wishlist</Link>
			</li>
			<li>
				<Link href="/tickets">Tickets</Link>
			</li>
			<li>
				{user ? (
					<button
						className="flex items-center gap-2 rounded-md border-[1px] border-base bg-accent p-1 text-skin-inverted"
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
