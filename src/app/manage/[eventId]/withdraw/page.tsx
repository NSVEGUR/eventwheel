import { getEvent } from '@/lib/server/event';
import WithdrawalForm from '@/components/WithdrawalForm';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const ONE_DAY = 60 * 60 * 24 * 1000;
	const event = await getEvent(params.eventId);
	const result =
		new Date(event.starts).getTime() -
			new Date().getTime() <
		ONE_DAY;
	return (
		<>
			{result ? (
				<WithdrawalForm {...{ event }}></WithdrawalForm>
			) : (
				<div className="flex h-full w-full items-center justify-center">
					<h1 className="text-center text-xl text-skin-complementary">
						Withdrawal form will be enabled a day before
						event starts
					</h1>
				</div>
			)}
		</>
	);
}
