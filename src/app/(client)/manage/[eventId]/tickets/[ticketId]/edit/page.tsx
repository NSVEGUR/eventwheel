import TicketForm from '@/components/TicketForm';
import { getTicket } from '@/lib/server/ticket';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: {
		eventId: string;
		ticketId: string;
	};
}) {
	const ticket = await getTicket(
		params.eventId,
		params.ticketId
	);
	return (
		<TicketForm
			{...{
				eventId: params.eventId,
				method: 'PATCH',
				ticket
			}}
		></TicketForm>
	);
}
