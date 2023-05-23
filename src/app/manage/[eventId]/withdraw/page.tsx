import { getEvent } from '@/lib/server/event';
import WithdrawalForm from '@/components/WithdrawalForm';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return <WithdrawalForm {...{ event }}></WithdrawalForm>;
}
