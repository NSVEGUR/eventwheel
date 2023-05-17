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
					className="fixed right-16 top-16 z-50 flex min-w-[200px] flex-col gap-2 rounded-lg border-[1px] border-base bg-dominant p-3 text-base shadow-md"
					id="menu"
				>
					<div className="my-2 flex gap-2 text-sm">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-skin-inverted">
							{user?.email?.slice(0, 2).toUpperCase() ??
								'Anonymous'}
						</div>
						<div className="flex flex-col gap-1">
							<h1>{user?.email ?? 'Anonymous'}</h1>
							<h2 className="text-xs text-skin-complementary">
								{user?.email ?? 'Anonymous'}
							</h2>
						</div>
					</div>
					<ul className="flex flex-col items-start justify-center gap-3 overflow-hidden rounded-lg bg-muted">
						{hyperlinks.map((hyperlink, index) => {
							return (
								<li key={index} className="w-full">
									<Link
										href={hyperlink.link}
										className="flex gap-3 px-5 py-2 hover:bg-muted-hover"
									>
										{hyperlink.name}
									</Link>
								</li>
							);
						})}
					</ul>
					<button
						className="mt-3 flex w-full items-center justify-center gap-2"
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
							className="h-6 w-6"
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
