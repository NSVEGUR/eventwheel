import 'server-only';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { getImage } from '@/lib/server/image';
import Image from 'next/image';
import TicketPrinter from '@/components/TicketPrinter';

async function getMyTicket(ticketId: string) {
	try {
		const ticket = await prisma.userTicket.findUnique({
			where: {
				id: ticketId
			},
			select: {
				id: true,
				ticket: {
					select: {
						type: true,
						description: true,
						price: true,
						event: {
							select: {
								image: true,
								id: true,
								title: true,
								summary: true,
								type: true,
								description: true,
								category: true,
								subCategory: true
							}
						}
					}
				}
			}
		});
		if (!ticket) {
			throw new AppError('Ticket not found', 404);
		}
		return {
			id: ticket.id,
			type: ticket.ticket.type,
			description: ticket.ticket.description,
			price: ticket.ticket.price,
			eventId: ticket.ticket.event.id,
			eventTitle: ticket.ticket.event.title,
			eventImage: getImage(ticket.ticket.event.image),
			eventSummary: ticket.ticket.event.summary,
			eventType: ticket.ticket.event.type,
			eventCategory: ticket.ticket.event.category,
			eventSubCategory: ticket.ticket.event.subCategory
		};
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export default async function Page({
	params
}: {
	params: { ticketId: string };
}) {
	const ticket = await getMyTicket(params.ticketId);
	return (
		<div className="relative grid h-full w-full place-items-center">
			<TicketPrinter />
			<div
				className="flex w-[300px] flex-col gap-3 rounded-md p-5 shadow-md"
				id="ticket"
			>
				<div className="flex gap-1">
					<div className="relative h-10 w-10 rounded-md bg-muted">
						{ticket.eventImage && (
							<Image
								src={ticket.eventImage}
								alt="Event image"
								fill
								className="rounded-md object-cover"
							/>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<h1 className="text-sm font-bold">
							{ticket.eventTitle}
						</h1>
						<h2 className="text-sm">
							Type:{' '}
							<span className="font-medium text-complementary">
								{ticket.type}
							</span>
						</h2>
					</div>
				</div>
				<h1>
					Price:{' '}
					<span className="text-base font-bold text-complementary">
						$ {ticket.price}
					</span>
				</h1>
				<h1>
					TicketId:{' '}
					<span className="text-skin-complementary">
						{ticket.id}
					</span>
				</h1>
				<h1>
					Description:{' '}
					<span className="text-skin-complementary">
						{ticket.description}
					</span>
				</h1>
			</div>
		</div>
	);
}
