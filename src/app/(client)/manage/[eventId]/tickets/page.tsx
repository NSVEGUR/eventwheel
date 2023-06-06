import Link from 'next/link';
import { getEvent } from '@/lib/server/event';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return (
		<div className="grid grid-cols-3 gap-5 p-10 -md:grid-cols-1">
			{event.tickets.map((ticket, index) => {
				return (
					<Link
						href={`/manage/${params.eventId}/tickets/${ticket.id}`}
						key={index}
						className="flex flex-col items-start justify-center gap-2 rounded-md border-[1px] border-base p-10 text-accent shadow-md"
					>
						<h1 className="text-3xl font-medium text-accent">
							{ticket.type}
						</h1>
						<p className="text-sm text-skin-complementary">
							{ticket.description}
						</p>
						<h3>
							Price:{' '}
							<span className="text-xl font-medium text-complementary">
								{ticket.price} $
							</span>
						</h3>
						<h3>
							Count:{' '}
							<span className="text-xl font-medium text-complementary">
								{ticket.available}
							</span>
						</h3>
					</Link>
				);
			})}
			<Link
				className="flex items-center justify-center rounded-md border-[1px] border-accent bg-light-accent p-10 text-accent"
				href={`/manage/${params.eventId}/tickets/create`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</Link>
		</div>
	);
}
