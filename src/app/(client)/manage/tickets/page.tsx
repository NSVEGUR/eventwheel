import 'server-only';
import { getEvents } from '@/lib/server/event';
import Table from '@/components/LinksTable';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const events = await getEvents();
	const mappedTickets = events.map(
		(
			{ title: eventTitle, id: eventId, tickets },
			index
		) => {
			const arr = tickets.map(
				({
					id: ticketId,
					type,
					sold,
					price,
					available
				}) => {
					return {
						eventTitle,
						eventId,
						ticketId,
						type,
						details: `${sold}/${available}`,
						gross: (sold * price).toString()
					};
				}
			);
			return arr;
		}
	);
	let tickets: {
		ticketId: string;
		eventTitle: string;
		eventId: string;
		type: string;
		details: string;
		gross: string;
	}[] = [];
	for (let i = 0; i < mappedTickets.length; i++) {
		tickets = tickets.concat(mappedTickets[i]);
	}
	return (
		<div className="p-10">
			<Table
				title={'Tickets'}
				caption={
					'Details of all the tickets created by you.'
				}
				header={[
					'Sl. No.',
					'Ticket Id',
					'Ticket Type',
					'Event Id',
					'Event Title',
					'Sold/Available',
					'Gross($)'
				]}
				body={tickets.map((ticket, index) => {
					return {
						link: `/manage/${ticket.eventId}/tickets/${ticket.ticketId}`,
						values: [
							(index + 1).toString(),
							...Object.values(ticket)
						]
					};
				})}
			/>
		</div>
	);
}
