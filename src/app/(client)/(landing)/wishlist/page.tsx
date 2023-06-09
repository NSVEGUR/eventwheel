import 'server-only';
import { getImage } from '@/lib/server/image';
import EventCard from '@/components/EventCard';
import { getWishlistEvents } from '@/lib/server/event';

export const dynamic = 'force-dynamic';

export default async function Home() {
	const events = await getWishlistEvents();
	events.map((event) => {
		event.image = getImage(event.image);
	});
	return (
		<section className="flex flex-col items-center justify-center">
			{events.length === 0 ? (
				<div className="flex h-screen w-screen items-center justify-center ">
					<h1 className="text-2xl font-medium text-skin-complementary">
						No Events were found in wishlist
					</h1>
				</div>
			) : (
				<>
					<h1 className="my-5 text-center text-4xl font-bold">
						Wishlist
					</h1>
					<div className="grid grid-cols-4 gap-4 px-20 py-10 -xl:grid-cols-3 -lg:grid-cols-2 -sm:grid-cols-1 -sm:px-2">
						{events.map(({ liked, tickets, ...event }) => {
							return (
								<EventCard
									key={event.id}
									{...{ event, liked, tickets }}
								/>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
}
