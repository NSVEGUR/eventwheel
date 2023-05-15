import { getEvents } from '@/lib/server/event';
import Link from 'next/link';

export default async function Page() {
	const events = await getEvents();
	return (
		<div className="flex flex-col p-5">
			<h1 className="text-4xl font-bold">Events</h1>
			<ul className="p-1 pl-2 h-10 grid grid-cols-9 place-content-center text-sm font-medium bg-muted border-b-[1px] border-base mt-10">
				<li className="col-span-3 place-self-start flex items-center gap-1">
					<span>Title</span>
				</li>
				<li className="col-span-2 place-self-start flex items-center gap-1">
					<span>Sold</span>
				</li>
				<li className="col-span-2 place-self-start">
					<span>Gross</span>
				</li>
				<li className="col-span-2 place-self-start">
					<span>Status</span>
				</li>
			</ul>
			{events.map((event, index) => {
				return (
					<Link
						href={`/manage/${event.id}`}
						key={index}
						className="hover:bg-muted-hover"
					>
						<ul className="p-1 pl-2 h-10 grid grid-cols-9 place-content-center text-sm font-medium border-b-[1px] border-base">
							<li className="col-span-3 place-self-start flex items-center gap-1">
								<span>{event.title}</span>
							</li>
							<li className="col-span-2 place-self-start">
								<span>{event.type}</span>
							</li>
							<li className="col-span-2 place-self-start flex items-center gap-1">
								<span>{event.tickets.length}</span>
							</li>
							<li className="col-span-2 place-self-start">
								<span>-</span>
							</li>
						</ul>
					</Link>
				);
			})}
		</div>
	);
}
