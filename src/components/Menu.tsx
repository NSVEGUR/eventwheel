import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/supabase-auth-provider';

const hyperlinks = [
	{
		name: 'Home',
		link: '/'
	},
	{
		name: 'Create',
		link: '/manage/create'
	},
	{
		name: 'My Tickets',
		link: '/tickets'
	}
];

interface Props {
	showMenu: boolean;
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({ showMenu }: Props) {
	const { signOut, user } = useAuth();
	return (
		<>
			{showMenu && (
				<menu
					className="min-w-[200px] fixed z-50 right-16 top-16 bg-dominant border-[1px] border-base shadow-md text-base rounded-lg p-3 flex flex-col gap-2"
					id="menu"
				>
					<div className="flex gap-2 text-sm my-2">
						<div className="w-8 h-8 rounded-full bg-accent text-skin-inverted flex items-center justify-center">
							{user?.email?.slice(0, 2).toUpperCase() ??
								'Anonymous'}
						</div>
						<div className="flex flex-col gap-1">
							<h1>{user?.email ?? 'Anonymous'}</h1>
							<h2 className="text-skin-complementary text-xs">
								{user?.email ?? 'Anonymous'}
							</h2>
						</div>
					</div>
					<ul className="flex flex-col items-start justify-center gap-3 bg-muted rounded-lg overflow-hidden">
						{hyperlinks.map((hyperlink, index) => {
							return (
								<li key={index} className="w-full">
									<Link
										href={hyperlink.link}
										className="flex gap-3 hover:bg-muted-hover px-5 py-2"
									>
										{hyperlink.name}
									</Link>
								</li>
							);
						})}
					</ul>
					<button
						className="flex gap-2 items-center justify-center mt-3 w-full"
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
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
						<span>Logout</span>
					</button>
				</menu>
			)}
		</>
	);
}
