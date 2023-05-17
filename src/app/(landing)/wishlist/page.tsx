import 'server-only';
import { getImage } from '@/lib/server/image';
import EventCard from '@/components/EventCard';
import Link from 'next/link';
import { getWishlistEvents } from '@/lib/server/event';

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
					<div className="grid grid-cols-4 gap-4 px-20 py-10">
						{events.map(({ liked, ...event }) => {
							return (
								<EventCard
									key={event.id}
									{...{ event, liked }}
								/>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
}
