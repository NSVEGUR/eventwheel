import { getEvents } from '@/lib/server/event';
import { getTicketsDetails } from '@/utils/tickets';
import Link from 'next/link';

export const revalidate = 30;

export default async function Page() {
	const events = await getEvents();
	return (
		<div className="flex flex-col p-5">
			<h1 className="text-4xl font-bold">Events</h1>
			<ul className="mt-10 grid h-10 grid-cols-9 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium">
				<li className="col-span-3 flex items-center gap-1 place-self-start">
					<span>Title</span>
				</li>
				<li className="col-span-2 flex items-center gap-1 place-self-start">
					<span>Sold</span>
				</li>
				<li className="col-span-2 place-self-start">
					<span>Gross($)</span>
				</li>
				<li className="col-span-2 place-self-start">
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
						<ul className="grid h-10 grid-cols-9 place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium">
							<li className="col-span-3 flex items-center gap-1 place-self-start">
								<span>{event.title}</span>
							</li>
							<li className="col-span-2 place-self-start">
								<span>{sold}</span>
							</li>
							<li className="col-span-2 flex items-center gap-1 place-self-start">
								<span>{gross}</span>
							</li>
							<li className="col-span-2 place-self-start">
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
