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
				name: true,
				email: true,
				phone: true,
				ticket: {
					select: {
						type: true,
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
			name: ticket.name,
			phone: ticket.phone,
			email: ticket.email,
			type: ticket.ticket.type,
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
		<main className="min-w-screen relative flex h-full w-full">
			<div className="absolute inset-0 flex h-full w-full items-center justify-center">
				<Image
					src="/noisy-gradient.png"
					alt="Noisy Gradient"
					fill={true}
					priority={true}
				></Image>
			</div>
			<div className="relative grid h-full w-full place-items-center">
				<TicketPrinter />
				<div
					className="flex w-[350px] flex-col gap-3 rounded-md bg-dominant p-5 shadow-md -sm:w-[250px]"
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
						Name:{' '}
						<span className="text-skin-complementary">
							{ticket.name ?? 'undefined'}
						</span>
					</h1>
					<h1>
						Email:{' '}
						<span className="text-skin-complementary">
							{ticket.email}
						</span>
					</h1>
					<h1>
						Phone:{' '}
						<span className="text-skin-complementary">
							{ticket.phone ?? 'undefined'}
						</span>
					</h1>
				</div>
			</div>
		</main>
	);
}
