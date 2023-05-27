import 'server-only';
import { getUserTickets } from '@/lib/server/ticket';
import QRReader from '@/components/QRReader';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const tickets = await getUserTickets(params.eventId);
	return (
		<div className="h-full w-full">
			<QRReader {...{ tickets }} />
		</div>
	);
}
