import EventCard from './EventCard';
import { Event, AdminTicket } from '@prisma/client';

export interface LikedEvent extends Event {
	liked: boolean | undefined;
	tickets: AdminTicket[];
}

export default function EventView({
	events
}: {
	events: LikedEvent[];
}) {
	return (
		<div className="grid grid-cols-4 gap-5 px-20 py-10 -xl:grid-cols-3 -lg:grid-cols-2 -sm:grid-cols-1 -sm:px-2">
			{events.map(({ liked, tickets, ...event }) => {
				return (
					<EventCard
						key={event.id}
						{...{ event, liked, tickets }}
					/>
				);
			})}
		</div>
	);
}
