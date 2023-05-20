import 'server-only';
import { getImage } from '@/lib/server/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getEventsUnAuthenticated } from '@/lib/server/event';
import AuthPopup from '@/components/AuthPopup';

const EventCard = dynamic(
	() => import('@/components/EventCard'),
	{ ssr: false }
);

export default async function Home() {
	const events = await getEventsUnAuthenticated();
	events.map((event) => {
		event.image = getImage(event.image);
	});
	return (
		<AuthPopup>
			<section className="flex flex-col items-center justify-center">
				<div className="relative flex h-96 w-full flex-col items-center justify-center gap-3 bg-accent bg-gradient-mesh text-center text-skin-inverted">
					<h1 className="text-5xl font-bold">Eventmate.</h1>
					<h3>
						The affordable and reliable event ticket
						management platform you will ever find
					</h3>
					<div className="flex w-full items-center justify-center gap-3">
						<Link
							href="/manage"
							className="w-[150px] rounded-md border-[2px] border-accent bg-transparent p-2 text-center text-accent"
						>
							Manage one
						</Link>
						<Link
							href="/tickets"
							className="w-[150px] rounded-md border-[2px] border-accent bg-accent p-2 text-center"
						>
							Find your next
						</Link>
					</div>
				</div>
				{events.length === 0 ? (
					<h1 className="text-2xl font-medium text-skin-complementary">
						No Events were found
					</h1>
				) : (
					<div className="grid grid-cols-4 gap-5 px-20 py-10 -xl:grid-cols-3 -lg:grid-cols-2 -sm:grid-cols-1 -sm:px-2">
						{events.map(({ liked, ...event }) => {
							return (
								<EventCard
									key={event.id}
									{...{ event, liked }}
								/>
							);
						})}
					</div>
				)}
			</section>
		</AuthPopup>
	);
}
