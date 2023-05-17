import 'server-only';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { getImage } from '@/lib/server/image';
import Image from 'next/image';

async function getMyTickets() {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication failed, login to continue',
				401
			);
		}
		const tickets = await prisma.userTicket.findMany({
			where: {
				userId: user.id
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
		const userTickets = tickets.map((ticket) => {
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
		});
		return userTickets;
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

export default async function Page() {
	const tickets = await getMyTickets();
	return (
		<>
			{tickets.length === 0 ? (
				<div className="flex h-screen w-screen items-center justify-center">
					<h1 className="text-2xl font-medium text-skin-complementary">
						No Tickets Found
					</h1>
				</div>
			) : (
				<>
					<h1 className="my-5 text-center text-4xl font-bold">
						Tickets
					</h1>
					<div className="grid grid-cols-4 gap-10 p-10">
						{tickets.map((ticket, index) => {
							return (
								<div
									key={index}
									className="flex flex-col gap-3 rounded-md border-[1px] border-base p-5 text-sm shadow-md"
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
							);
						})}
					</div>
				</>
			)}
		</>
	);
}
