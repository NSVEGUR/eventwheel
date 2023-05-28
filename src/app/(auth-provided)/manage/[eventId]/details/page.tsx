import DetailsForm from '@/components/DetailsForm';
import { getEvent } from '@/lib/server/event';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return <DetailsForm {...{ event }} />;
}
