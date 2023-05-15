import { getEvent } from '@/lib/server/event';
import WithdrawalForm from '@/components/WithdrawalForm';
import { Event } from '@prisma/client';

export const revalidate = 30;

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const { tickets, ...others } = await getEvent(
		params.eventId
	);
	return (
		<WithdrawalForm
			{...{ event: others as Event }}
		></WithdrawalForm>
	);
}
