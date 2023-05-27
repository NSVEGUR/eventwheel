import 'server-only';
import { getImage } from '@/lib/server/image';
import { getEventsUnAuthenticated } from '@/lib/server/event';
import AuthPopup from '@/components/AuthPopup';
import Landing from '@/components/Landing';

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
	return (
		<AuthPopup>
			<Landing {...{ events: filteredEvents }} />
		</AuthPopup>
	);
}
