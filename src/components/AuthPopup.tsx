'use client';

import { useAuth } from '@/components/providers/supabase-auth-provider';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AuthPop({
	children
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();
	const [authState, setAuthState] = useState(true);
	function closePopup() {
		setAuthState(true);
	}
	useEffect(() => {
		setTimeout(() => {
			if (!user && !isLoading) {
				setAuthState(false);
			}
		}, 1000);
	}, [user, isLoading]);
	return (
		<>
			{!authState && (
				<div className="fixed inset-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 -md:items-end">
					<div className="relative flex w-[50%] max-w-[500px] flex-col items-center justify-center gap-5 rounded-md bg-dominant p-10 text-center -md:w-full">
						<button
							className="absolute right-8 top-5"
							onClick={closePopup}
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
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<div className="mt-5 flex items-center gap-2">
							<Image
								src="/logo.svg"
								width={50}
								height={50}
								alt="Picture of Logo"
							></Image>
							<h1 className="text-3xl font-medium">
								eventmate
							</h1>
						</div>
						<Link
							href="/signin"
							className="w-full rounded-lg bg-accent p-2 text-skin-inverted"
						>
							Login
						</Link>
						<div className="flex w-full items-center justify-center">
							<div className="h-[1px] w-full flex-grow bg-muted-complementary"></div>
							<span className="rounded-xl border-[1px] border-complementary px-3">
								or
							</span>
							<div className="h-[1px] w-full flex-grow bg-muted-complementary"></div>
						</div>
						<button
							className="w-full rounded-lg border-[1px] border-inverted p-2"
							onClick={closePopup}
						>
							Continue as guest
						</button>
					</div>
				</div>
			)}
			{children}
		</>
	);
}
