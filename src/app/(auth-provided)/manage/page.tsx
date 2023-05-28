import { getEvents } from '@/lib/server/event';
import { getTicketsDetails } from '@/utils/tickets';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const events = await getEvents();
	return (
		<div className="flex flex-col p-5">
			<h1 className="text-4xl font-bold">Created Events</h1>
			<ul className="mt-10 grid h-10 grid-cols-5 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium -sm:grid-cols-2">
				<li className="place-self-start">
					<span>Sl.No.</span>
				</li>
				<li className="place-self-start">
					<span>Title</span>
				</li>
				<li className="place-self-start -sm:hidden">
					<span>Sold</span>
				</li>
				<li className="place-self-start -sm:hidden">
					<span>Gross($)</span>
				</li>
				<li className="place-self-start -sm:hidden">
					<span>Status</span>
				</li>
			</ul>
			{events.map((event, index) => {
				const { sold, gross } = getTicketsDetails(
					event.tickets
				);
				return (
					<Link
						href={`/manage/${event.id}`}
						key={index}
						className="hover:bg-muted-hover"
					>
						<ul className="grid h-10 grid-cols-5 place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium -sm:grid-cols-2">
							<li className="place-self-start">
								<span>{index + 1}</span>
							</li>
							<li className="place-self-start">
								<span>{event.title}</span>
							</li>
							<li className="place-self-start -sm:hidden">
								<span>{sold}</span>
							</li>
							<li className="place-self-start -sm:hidden">
								<span>{gross}</span>
							</li>
							<li className="place-self-start -sm:hidden">
								<span>
									{event.published ? 'Published' : 'Draft'}
								</span>
							</li>
						</ul>
					</Link>
				);
			})}
		</div>
	);
}
