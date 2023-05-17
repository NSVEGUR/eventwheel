'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import Menu from '@/components/Menu';
import { useAuth } from '@/components/providers/supabase-auth-provider';

interface Props {
	showNavBar: Boolean;
	setShowNavBar: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
	showNavBar,
	setShowNavBar
}: Props) {
	const pathname = usePathname();
	const [showMenu, setShowMenu] = useState(false);
	const { user } = useAuth();
	return (
		<header className="relative flex h-16 items-center justify-between gap-5 border-b-[1px] border-base bg-dominant px-16 -lg:px-2">
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
			<div className="flex items-center justify-center gap-3 -lg:ml-8">
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
			<div className="flex h-full items-center gap-5 text-sm">
				{pathname !== '/manage/create' && (
					<Link
						href="/manage/create"
						className="flex items-center justify-center gap-2 rounded-full border-[1px] border-complementary p-1 px-2 text-complementary hover:bg-muted"
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Create
					</Link>
				)}
				<button
					className="flex items-center gap-2 rounded-full bg-muted p-1 hover:bg-muted-hover -lg:hidden"
					onClick={() => {
						setShowMenu(!showMenu);
					}}
					id="menu-btn"
				>
					<div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent p-1 text-xs text-skin-inverted">
						{user?.email?.slice(0, 2).toUpperCase() ?? 'UN'}
					</div>
					<span className="w-16 overflow-hidden text-ellipsis">
						{user?.email ?? 'Anonymous'}
					</span>
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
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>
				</button>
				<button
					className="flex h-7 w-7 items-center justify-center rounded-full bg-accent p-1 text-xs text-skin-inverted lg:hidden"
					onClick={() => {
						setShowMenu(!showMenu);
					}}
					id="menu-btn"
				>
					NV
				</button>
				{user && (
					<Menu
						{...{
							showMenu,
							setShowMenu,
							user: user
						}}
					/>
				)}
			</div>
		</header>
	);
}
