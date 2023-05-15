import DetailsForm from '@/components/DetailsForm';
import { getEvent } from '@/lib/server/event';

export const revalidate = 30;

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return <DetailsForm {...{ event }} />;
}
