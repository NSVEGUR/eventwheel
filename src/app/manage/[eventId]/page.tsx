import { getWithdrawals } from '@/lib/server/event';
import { getTicketsDetails } from '@/utils/tickets';
import ShareMenuManage from '@/components/ShareMenuManage';
import { formatDateWithAmPm } from '@/utils/date';
import Link from 'next/link';
import Script from 'next/script';

export const revalidate = 30;

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
	return (
		<>
			<div className="flex flex-col gap-5 px-20 py-5 -md:px-2">
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
						<h1 className="mt-5 text-2xl font-medium text-accent">
							Share
						</h1>
						<div className="flex flex-col gap-3">
							<ShareMenuManage {...{ event: event }} />
						</div>
					</div>
				</div>
				<div className="my-10 flex justify-between">
					<h1 className="whitespace-pre-wrap text-3xl font-bold">
						Withdrawal Requests
					</h1>
					<Link
						href={`/manage/${event.id}/withdraw`}
						className="rounded-md bg-accent p-2 text-skin-inverted"
					>
						Create New
					</Link>
				</div>
				<ul className="grid h-10 grid-cols-7 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium -md:grid-cols-3">
					<li className="flex items-center gap-1 place-self-start">
						<span>Id</span>
					</li>
					<li className="flex items-center gap-1 place-self-start -md:hidden">
						<span>Transit Number</span>
					</li>
					<li className="place-self-start -md:hidden">
						<span>Institution Number</span>
					</li>
					<li className="place-self-start -md:hidden">
						<span>Account Number</span>
					</li>
					<li className="place-self-start">
						<span>Amount ($)</span>
					</li>
					<li className="place-self-start -md:hidden">
						<span>Created At</span>
					</li>
					<li className="place-self-start">
						<span>Status</span>
					</li>
				</ul>
				{withdrawalRequests.map((withdrawal, index) => {
					return (
						<ul
							className="grid min-h-[40px] grid-cols-7 place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium -md:grid-cols-3"
							key={index}
						>
							<li className="place-self-start">
								<span>{withdrawal.id}</span>
							</li>
							<li className="place-self-start -md:hidden">
								<span>{withdrawal.transitNumber}</span>
							</li>
							<li className="place-self-start -md:hidden">
								<span>{withdrawal.institutionNumber}</span>
							</li>
							<li className="place-self-start -md:hidden">
								<span>{withdrawal.accountNumber}</span>
							</li>
							<li className="place-self-start">
								<span>{withdrawal.amount}</span>
							</li>
							<li className="place-self-start -md:hidden">
								<span>
									{formatDateWithAmPm(withdrawal.createdAt)}
								</span>
							</li>
							<li className="place-self-start">
								<span>
									{withdrawal.approved
										? 'Approved'
										: 'In Process'}
								</span>
							</li>
						</ul>
					);
				})}
			</div>
			<Script
				src="https://kit.fontawesome.com/549aab17e5.js"
				crossOrigin="anonymous"
			></Script>
		</>
	);
}
