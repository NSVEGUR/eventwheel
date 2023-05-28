import 'server-only';
import { getImage } from '@/lib/server/image';
import { getEventsUnAuthenticated } from '@/lib/server/event';
import AuthPopup from '@/components/AuthPopup';
import Landing from '@/components/Landing';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
	const events = await getEventsUnAuthenticated();
	const filteredEvents = events.map((event) => {
		return {
			...event,
			image: getImage(event.image),
			searchTerms: `${event.title} ${event.type} ${
				event.subCategory ?? ''
			} ${event.location}`
		};
	});
	const hyperlinks = [
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'Create',
			path: '/manage/create'
		},
		{
			name: 'Manage',
			path: '/manage'
		},
		{
			name: 'Wishlist',
			path: '/wishlist'
		},
		{
			name: 'Tickets',
			path: '/tickets'
		},
		{
			name: 'Privacy Policy',
			path: '/privacy-policy'
		}
	];
	return (
		<AuthPopup>
			<>
				<Landing {...{ events: filteredEvents }} />
				<footer className="w-full bg-muted text-skin-complementary">
					<div className="grid grid-cols-3 justify-items-center p-4 -md:grid-cols-2 -md:gap-10 -sm:grid-cols-1 -sm:justify-items-start">
						<div className="flex flex-col gap-5">
							<div className="flex items-center gap-2">
								<Image
									src="/logo.svg"
									width={30}
									height={30}
									alt="Picture of Logo"
								></Image>
								<h1 className="text-lg font-medium text-skin-base">
									Eventwheel
								</h1>
							</div>
							<p className="w-60">
								The affordable and reliable event ticket
								management platform you will ever find
							</p>
						</div>
						<div>
							<h1 className="font-secondary text-xl font-bold text-skin-base">
								Quick Links
							</h1>
							<ul className="mt-5 flex flex-col gap-1">
								{hyperlinks.map((hyperlink, index) => {
									return (
										<li
											key={index}
											className="transition-all duration-200 hover:scale-105 hover:text-accent"
										>
											<Link href={hyperlink.path}>
												{hyperlink.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="-md:col-span-2 -sm:col-span-1">
							<h1 className="font-secondary text-xl font-bold text-skin-base">
								Contact Us
							</h1>
							<p className="mt-5 w-60">
								Montreal, Quebec, Canada.
							</p>
						</div>
					</div>
					<div className="border-light-muted flex w-full flex-col items-center justify-center gap-3 border-t-[1px] py-5">
						<h4 className="-sm:text-sm">
							© 2023 Eventwheel | Powered by Eventwheel
						</h4>
						<ul className="flex gap-5 -sm:text-sm" />
					</div>
				</footer>
			</>
		</AuthPopup>
	);
}
