import 'server-only';
import { getWithdrawals } from '@/lib/server/event';
import { getTicketsDetails } from '@/utils/tickets';
import ShareMenu from '@/components/ShareMenu';
import { formatDate } from '@/utils/date';
import Link from 'next/link';
import { baseURL } from '@/lib/constants';
import Table from '@/components/Table';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const {
		withdrawalRequests,
		likedUsers,
		others: event
	} = await getWithdrawals(params.eventId);
	const { sold, gross, available } = getTicketsDetails(
		event.tickets
	);
	const ONE_DAY = 60 * 60 * 24 * 1000;
	const result =
		new Date(event.starts).getTime() -
			new Date().getTime() <
		ONE_DAY;
	return (
		<div className="h-screen w-full overflow-scroll">
			<div className="mb-20 flex flex-col gap-5 px-20 py-5 -md:px-2">
				<h1 className="mb-5 text-3xl font-bold">
					Dashboard
				</h1>
				<div className="flex flex-wrap gap-10">
					<div className="flex gap-10">
						<div className="grid min-w-[200px] grid-cols-2 gap-2 rounded-md border-[1px] border-base p-5 shadow-md">
							<h1 className="font-medium">Tickets Sold:</h1>
							<h2 className="font-bold text-accent">
								<span className="text-complementary">
									{sold}
								</span>{' '}
								/ {available}
							</h2>
							<h1 className="font-medium">Gross:</h1>
							<h2 className="font-bold text-complementary">
								{gross}$
							</h2>
							<h1 className="font-medium">Views:</h1>
							<h2 className="font-bold text-complementary">
								{event.views}
							</h2>
							<h1 className="font-medium">Event Likes:</h1>
							<h2 className="font-bold text-complementary">
								{likedUsers.length}
							</h2>
						</div>
					</div>
					<div>
						<h1 className="my-5 text-2xl font-medium text-accent">
							Share Event
						</h1>
						<div className="flex flex-col gap-3">
							<ShareMenu
								{...{
									url: baseURL + event.id,
									title: event.title
								}}
							/>
						</div>
					</div>
				</div>
				<div className="my-10 flex justify-end">
					{result && (
						<Link
							href={`/manage/${event.id}/withdraw`}
							className="rounded-md bg-accent p-2 text-skin-inverted"
						>
							Create New
						</Link>
					)}
				</div>
				{result ? (
					<Table
						title={'Withdrawal Requests'}
						caption={
							'Details of previous withdrawal requests created by you.'
						}
						header={[
							'id',
							'transit number',
							'institution number',
							'account number',
							'created at',
							'status'
						]}
						body={withdrawalRequests.map(
							({
								id,
								transitNumber,
								institutionNumber,
								accountNumber,
								createdAt,
								approved
							}) => {
								return [
									id,
									transitNumber.toString(),
									institutionNumber.toString(),
									accountNumber.toString(),
									formatDate(createdAt),
									approved ? 'Approved' : 'In Process'
								];
							}
						)}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<h1 className="text-center text-xl text-skin-complementary">
							Withdrawal form will be enabled a day before
							event starts
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}
