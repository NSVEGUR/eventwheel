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
		<div className="p-10 grid grid-cols-3 gap-5">
			{event.tickets.map((ticket, index) => {
				return (
					<div
						key={index}
						className="relative p-10 border-[1px] border-base text-accent flex flex-col gap-2 items-start justify-center rounded-md shadow-md"
					>
						<Link
							href={`/manage/${params.eventId}/tickets/${ticket.id}`}
							className="absolute top-2 right-2 flex gap-2 items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
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
						<p className="text-skin-complementary text-sm">
							{ticket.description}
						</p>
						<h3>
							Price:{' '}
							<span className="text-complementary text-3xl font-medium">
								$ {ticket.price}
							</span>
						</h3>
						<h3>
							Count:{' '}
							<span className="text-complementary text-xl font-medium">
								{ticket.available}
							</span>
						</h3>
					</div>
				);
			})}
			<Link
				className="p-10 border-[1px] border-accent bg-light-accent text-accent flex items-center justify-center rounded-md"
				href={`/manage/${params.eventId}/tickets/create`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
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
