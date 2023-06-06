import 'server-only';
import { getTicket } from '@/lib/server/ticket';
import Link from 'next/link';
import TicketsAdminDetails from '@/components/TicketsAdminDetails';

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
		<div
			className="relative flex flex-col gap-10 p-10 -md:p-1"
			id="user-tickets"
		>
			<Link
				href={`/manage/${params.eventId}/tickets/${ticket.id}/edit`}
				className="absolute right-5 top-5 rounded-md bg-accent px-2 py-1 text-skin-inverted"
			>
				Edit
			</Link>
			<div className="-md:mt-5">
				<h1 className="text-3xl font-medium text-accent">
					{ticket.type}
				</h1>
				<p className="text-sm text-skin-complementary">
					{ticket.description}
				</p>
				<h3>
					Price:{' '}
					<span className="font-medium text-complementary">
						$ {ticket.price}
					</span>
				</h3>
				<h3>
					Count:{' '}
					<span className="font-medium text-complementary">
						{ticket.available}
					</span>
				</h3>
			</div>
			<TicketsAdminDetails ticket={ticket} />
		</div>
	);
}
