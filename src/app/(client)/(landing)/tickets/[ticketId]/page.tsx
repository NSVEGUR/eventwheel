import 'server-only';
import { getMyTicket } from '@/lib/server/ticket';
import Image from 'next/image';
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
		<main className="min-w-screen relative flex h-full w-full">
			<div className="absolute inset-0 flex h-full w-full items-center justify-center">
				<Image
					src="/noisy-gradient.png"
					alt="Noisy Gradient"
					fill={true}
					priority={true}
				></Image>
			</div>
			<div className="relative flex h-full w-full flex-col items-center justify-center gap-3">
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
