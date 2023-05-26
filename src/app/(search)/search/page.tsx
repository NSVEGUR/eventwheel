import 'server-only';
import { getImage } from '@/lib/server/image';
import { getEventsUnAuthenticated } from '@/lib/server/event';
import SearchView from '@/components/SearchView';

export const dynamic = 'force-dynamic';

export default async function Page() {
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
	return <SearchView {...{ events: filteredEvents }} />;
}
