import 'server-only';
import { getEvents } from '@/lib/server/event';
import { getTicketsDetails } from '@/utils/tickets';
import Link from 'next/link';
import Table from '@/components/LinksTable';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const events = await getEvents();
	return (
		<div className="p-10">
			<Table
				title={'Created Events'}
				caption={'List of events created by you.'}
				header={[
					'Sl. No.',
					'Event Id',
					'Event Title',
					'Sold/Available',
					'Gross($)',
					'Status'
				]}
				body={events.map((event, index) => {
					const { sold, gross, available } =
						getTicketsDetails(event.tickets);
					return {
						link: `/manage/${event.id}`,
						values: [
							(index + 1).toString(),
							event.id,
							event.title,
							`${sold}/${available}`,
							gross.toString(),
							event.ends < new Date()
								? 'Ended'
								: event.published
								? 'Published'
								: 'Hidden'
						]
					};
				})}
			/>
		</div>
	);
}
