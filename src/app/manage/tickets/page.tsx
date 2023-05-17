import { getEvents } from '@/lib/server/event';
import Link from 'next/link';

export const revalidate = 30;

export default async function Page() {
	const events = await getEvents();
	const mappedTickets = events.map(
		({ title, id, tickets }, index) => {
			const arr = tickets.map(
				({ type, sold, price, available }) => {
					return {
						title,
						id,
						type,
						sold,
						available,
						gross: sold * price
					};
				}
			);
			return arr;
		}
	);
	let tickets: {
		title: string;
		id: string;
		type: string;
		sold: number;
		available: number;
		gross: number;
	}[] = [];
	for (let i = 0; i < mappedTickets.length; i++) {
		tickets = tickets.concat(mappedTickets[i]);
	}
	return (
		<div className="flex flex-col p-5">
			<h1 className="text-4xl font-bold">Tickets</h1>
			<ul className="mt-10 grid h-10 grid-cols-5 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium">
				<li className="place-self-start">
					<span>Event</span>
				</li>
				<li className="place-self-start">
					<span>Id</span>
				</li>
				<li className="place-self-start">
					<span>Type</span>
				</li>
				<li className="place-self-start">
					<span>Sold/Available</span>
				</li>
				<li className="place-self-start">
					<span>Gross</span>
				</li>
			</ul>
			{tickets.map(
				(
					{ title, id, sold, gross, available, type },
					index
				) => {
					return (
						<Link
							href={`/manage/${id}/tickets`}
							key={index}
							className="hover:bg-muted-hover"
						>
							<ul className="grid min-h-[40px] grid-cols-5 place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium">
								<li className="place-self-start">
									<span>{title}</span>
								</li>
								<li className="place-self-start">
									<span>{id}</span>
								</li>
								<li className="place-self-start">
									<span>{type}</span>
								</li>
								<li className="place-self-start">
									<span>
										{sold} / {available}
									</span>
								</li>
								<li className="place-self-start">
									<span>{gross}</span>
								</li>
							</ul>
						</Link>
					);
				}
			)}
		</div>
	);
}
