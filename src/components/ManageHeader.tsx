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
		<header className="h-16 relative bg-dominant border-b-[1px] border-base flex gap-5 items-center justify-between px-16 -lg:px-2">
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
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
			<div className="flex gap-3 items-center justify-center -lg:ml-8">
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
			<div className="flex gap-5 text-sm h-full items-center">
				{pathname !== '/manage/create' && (
					<Link
						href="/manage/create"
						className="flex gap-2 items-center justify-center text-complementary border-[1px] border-complementary hover:bg-muted p-1 px-2 rounded-full"
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Create
					</Link>
				)}
				<button
					className="flex gap-2 items-center bg-muted rounded-full p-1 hover:bg-muted-hover -lg:hidden"
					onClick={() => {
						setShowMenu(!showMenu);
					}}
					id="menu-btn"
				>
					<div className="w-7 h-7 rounded-full bg-accent text-skin-inverted text-xs flex items-center justify-center p-1">
						{user?.email?.slice(0, 2).toUpperCase() ?? 'UN'}
					</div>
					<span className="w-16 text-ellipsis overflow-hidden">
						{user?.email ?? 'Anonymous'}
					</span>
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
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>
				</button>
				<button
					className="lg:hidden w-7 h-7 rounded-full bg-accent text-skin-inverted text-xs flex items-center justify-center p-1"
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
