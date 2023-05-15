'use client';

import Link from 'next/link';
import { useAuth } from './providers/supabase-auth-provider';

export default function Nav() {
	const { user, signOut } = useAuth();
	return (
		<nav className="h-full">
			<ul className="flex gap-10 items-center h-full">
				<li className="text-complementary">
					<Link href="/manage/create">Create</Link>
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
							className="border-[1px] border-base p-1 rounded-md flex items-center gap-2 bg-accent text-skin-inverted"
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
								className="w-4 h-4"
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
							className="border-[1px] border-base p-1 rounded-md flex items-center gap-2 bg-accent text-skin-inverted"
						>
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
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
							<span>Sign In</span>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}
