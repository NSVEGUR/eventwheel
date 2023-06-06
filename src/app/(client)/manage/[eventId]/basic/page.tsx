import { getEvent } from '@/lib/server/event';
import BasicCreationProxy from '@/components/BasicCreationProxy';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return <BasicCreationProxy event={event} />;
}
