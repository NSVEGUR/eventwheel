import { getEvent } from '@/lib/server/event';
import WithdrawalForm from '@/components/WithdrawalForm';
import { Event } from '@prisma/client';

export const revalidate = 30;

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return <WithdrawalForm {...{ event }}></WithdrawalForm>;
}
