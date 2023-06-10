import 'server-only';
import { getMyTicket } from '@/lib/server/ticket';
import Ticket from '@/components/TicketView';
import ShareMenu from '@/components/ShareMenu';
import { baseURL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { ticketId: string };
}) {
	const ticket = await getMyTicket(params.ticketId);
	return (
		<main className="relative flex h-[calc(100vh-theme(spacing.16))] w-screen overflow-scroll  bg-[url('/noisy-gradient.png')]  bg-cover">
			<div className="relative mt-5 flex h-full w-full flex-col items-center gap-3">
				<Ticket {...{ ticket, printer: true }} />
				<h1 className="text-xl font-medium">
					Share Ticket
				</h1>
				<ShareMenu
					{...{
						url: baseURL + `tickets/${ticket.id}`,
						title: `Ticket for event ${ticket.eventTitle}`
					}}
				/>
			</div>
		</main>
	);
}
