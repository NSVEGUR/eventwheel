import { getEvent } from '@/lib/server/event';

export const revalidate = 30;

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return (
		<div className="flex flex-col gap-3 py-5 px-20">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			<div className="flex gap-10">
				<div className="p-5 flex flex-col gap-2 shadow-md rounded-md border-[1px] border-base w-48">
					<h1>Tickets Sold</h1>
					<h1>0/0</h1>
					<h2>0 Paid, 0 Free</h2>
				</div>
				<div className="p-5 flex flex-col gap-2 shadow-md rounded-md border-[1px] border-base w-48">
					<h1>Page Views</h1>
					<h1>0 from eventmate</h1>
					<h2>Open Page Views Report</h2>
				</div>
			</div>
		</div>
	);
}
