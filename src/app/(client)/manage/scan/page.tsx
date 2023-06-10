import { getEvents } from '@/lib/server/event';
import { getTicketsDetails } from '@/utils/tickets';
import Table from '@/components/LinksTable';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const events = await getEvents();
	const publishedEvents = events.filter(
		(event) => event.published
	);
	return (
		<div className="p-10">
			<Table
				title={'Scanner'}
				caption={
					'Select the tickets and scan to check their validity for your events'
				}
				header={[
					'Sl. No.',
					'Event Id',
					'Event Title',
					'Sold/Available',
					'Gross($)'
				]}
				body={publishedEvents.map((event, index) => {
					const { sold, gross, available } =
						getTicketsDetails(event.tickets);
					return {
						link: `/manage/${event.id}/scan`,
						values: [
							(index + 1).toString(),
							event.id,
							event.title,
							`${sold}/${available}`,
							gross.toString()
						]
					};
				})}
			/>
		</div>
	);
}
