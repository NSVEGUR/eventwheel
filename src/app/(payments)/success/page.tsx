import 'server-only';
import Link from 'next/link';
import prisma from '@/lib/server/prisma';
import { AppError } from '@/lib/server/exception';
import { getImage } from '@/lib/server/image';
import TicketPrinter from '@/components/TicketPrinter';
import Image from 'next/image';

async function getTicket(sessionId: string | undefined) {
	if (!sessionId) {
		return null;
	}
	const ticket = await prisma.userTicket.findUnique({
		where: {
			checkoutSessionId: sessionId
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
		type: ticket.ticket.type,
		name: ticket.name,
		phone: ticket.phone,
		email: ticket.email,
		price: ticket.ticket.price,
		eventId: ticket.ticket.event.id,
		eventTitle: ticket.ticket.event.title,
		eventImage: getImage(ticket.ticket.event.image),
		eventSummary: ticket.ticket.event.summary,
		eventType: ticket.ticket.event.type,
		eventCategory: ticket.ticket.event.category,
		eventSubCategory: ticket.ticket.event.subCategory
	};
}

export default async function Page({
	params,
	searchParams
}: {
	params?: {
		id: string;
	};
	searchParams?: {
		[key: string]: string | undefined;
	};
}) {
	const sessionId = searchParams?.sessionId;
	const ticket = await getTicket(sessionId);
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-10 w-10 text-skin-okay"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h1>Transaction Successful</h1>
			{ticket && (
				<>
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
				</>
			)}
			<Link
				href="/"
				className="rounded-md bg-accent p-1 px-2 text-skin-inverted"
			>
				Return to Home
			</Link>
		</>
	);
}
