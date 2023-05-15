import 'server-only';
import prisma from '@/lib/server/prisma';
import { getImage } from '@/lib/server/image';
import EventCard from '@/components/EventCard';

async function getEvents() {
	const events = prisma.event.findMany({
		where: {
			published: true
		}
	});
	return events;
}

export default async function Home() {
	const events = await getEvents();
	events.map((event) => {
		event.image = getImage(event.image);
	});
	return (
		<section className="p-10 flex items-center justify-center">
			{events.length === 0 ? (
				<h1 className="text-2xl font-medium text-skin-complementary">
					No Events were found
				</h1>
			) : (
				<div className="grid grid-cols-5">
					{events.map((event) => {
						return (
							<EventCard key={event.id} {...{ event }} />
						);
					})}
				</div>
			)}
		</section>
	);
}
