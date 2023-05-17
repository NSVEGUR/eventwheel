import Link from 'next/link';
import { getEvent } from '@/lib/server/event';

export const revalidate = 30;

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	return (
		<div className="grid grid-cols-3 gap-5 p-10">
			{event.tickets.map((ticket, index) => {
				return (
					<div
						key={index}
						className="relative flex flex-col items-start justify-center gap-2 rounded-md border-[1px] border-base p-10 text-accent shadow-md"
					>
						<Link
							href={`/manage/${params.eventId}/tickets/${ticket.id}`}
							className="absolute right-2 top-2 flex items-center gap-2"
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
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</Link>
						<h1 className="text-3xl font-medium text-accent">
							{ticket.type}
						</h1>
						<p className="text-sm text-skin-complementary">
							{ticket.description}
						</p>
						<h3>
							Price:{' '}
							<span className="text-3xl font-medium text-complementary">
								$ {ticket.price}
							</span>
						</h3>
						<h3>
							Count:{' '}
							<span className="text-xl font-medium text-complementary">
								{ticket.available}
							</span>
						</h3>
					</div>
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
