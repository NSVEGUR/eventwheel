import 'server-only';
import { getTicket } from '@/lib/server/ticket';
import Link from 'next/link';
import TicketsDetailsPrinter from '@/components/TicketsDetailsPrinter';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: {
		eventId: string;
		ticketId: string;
	};
}) {
	const ticket = await getTicket(
		params.eventId,
		params.ticketId
	);
	return (
		<div
			className="relative flex flex-col gap-10 p-10 -md:p-1"
			id="user-tickets"
		>
			<Link
				href={`/manage/${params.eventId}/tickets/${ticket.id}/edit`}
				className="absolute right-5 top-5 rounded-md bg-accent px-2 py-1 text-skin-inverted"
			>
				Edit
			</Link>
			<div className="-md:mt-5">
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
			<div>
				<div className="flex items-center justify-between">
					<h1 className="mb-5 text-3xl font-bold text-accent">
						Details of users
					</h1>
					<TicketsDetailsPrinter />
				</div>
				<ul
					className="grid h-10 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium -xl:text-xs -md:text-[0.6rem]"
					style={{
						gridTemplateColumns: `repeat(${
							3 + ticket.labels.length
						}, minmax(0, 1fr))`
					}}
				>
					<li className="flex items-center gap-1 place-self-start">
						<span>Email</span>
					</li>
					<li className="place-self-start">
						<span>Name</span>
					</li>
					<li className="place-self-start">
						<span>Phone</span>
					</li>
					{ticket.labels.map((label, index) => {
						return (
							<li className="place-self-start" key={index}>
								<span>{label}</span>
							</li>
						);
					})}
				</ul>
				{ticket.tickets.map(
					({ email, name, phone, values }, index) => {
						return (
							<ul
								className="grid min-h-[40px] place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium -xl:text-xs -md:text-[0.6rem]"
								key={index}
								style={{
									gridTemplateColumns: `repeat(${
										3 + ticket.labels.length
									}, minmax(0, 1fr))`
								}}
							>
								<li className="min-w-0 max-w-full place-self-start truncate">
									<span>{email}</span>
								</li>
								<li className="min-w-0 max-w-full place-self-start truncate">
									<span>{name}</span>
								</li>
								<li className="min-w-0 max-w-full place-self-start truncate">
									<span>{phone}</span>
								</li>
								{values.map((value, index) => {
									return (
										<li
											className="min-w-0 max-w-full place-self-start truncate"
											key={index}
										>
											<span>{value}</span>
										</li>
									);
								})}
							</ul>
						);
					}
				)}
			</div>
		</div>
	);
}
