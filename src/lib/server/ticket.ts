import prisma from '@/lib/server/prisma';
import { AppError } from '@/lib/server/exception';
import { createServerClient } from '@/utils/supabase-server';
import { getImage } from '@/lib/server/image';
import qrcode from 'qrcode';
import { UserTicket } from '@/types/ticket';

export async function getTicket(
	eventId: string,
	ticketId: string
) {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication required, login to continue',
				401
			);
		}
		const event = await prisma.event.findUnique({
			where: {
				id: eventId
			},
			include: {
				tickets: true
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		if (event.userId !== user.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		const ticket = await prisma.adminTicket.findUnique({
			where: {
				id: ticketId
			},
			include: {
				tickets: true
			}
		});
		if (!ticket) {
			throw new AppError('Ticket not found', 404);
		}
		if (ticket.eventId !== event.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		return ticket;
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

export async function getMyTicket(ticketId: string) {
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
				scanned: true,
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
			scanned: ticket.scanned,
			type: ticket.ticket.type,
			price: ticket.ticket.price,
			eventId: ticket.ticket.event.id,
			eventTitle: ticket.ticket.event.title,
			eventImage: getImage(ticket.ticket.event.image),
			eventSummary: ticket.ticket.event.summary,
			eventType: ticket.ticket.event.type,
			eventCategory: ticket.ticket.event.category,
			eventSubCategory: ticket.ticket.event.subCategory,
			qrcode: await qrcode.toDataURL(ticket.id)
		};
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Server error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export async function getTicketWithSession(
	sessionId: string
) {
	try {
		const ticket = await prisma.userTicket.findUnique({
			where: {
				checkoutSessionId: sessionId
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				scanned: true,
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
			scanned: ticket.scanned,
			type: ticket.ticket.type,
			price: ticket.ticket.price,
			eventId: ticket.ticket.event.id,
			eventTitle: ticket.ticket.event.title,
			eventImage: getImage(ticket.ticket.event.image),
			eventSummary: ticket.ticket.event.summary,
			eventType: ticket.ticket.event.type,
			eventCategory: ticket.ticket.event.category,
			eventSubCategory: ticket.ticket.event.subCategory,
			qrcode: await qrcode.toDataURL(ticket.id)
		};
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Server error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export async function getUserTickets(eventId: string) {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication required, login to continue',
				401
			);
		}
		const event = await prisma.event.findUnique({
			where: {
				id: eventId
			},
			include: {
				tickets: {
					include: {
						tickets: true
					}
				}
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		if (event.userId !== user.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		const userTickets: UserTicket[] = [];
		for (const adminTicket of event.tickets) {
			const { tickets } = adminTicket;
			for (const userTicket of tickets) {
				userTickets.push({
					id: userTicket.id,
					name: userTicket.name,
					phone: userTicket.phone,
					email: userTicket.email,
					type: adminTicket.type,
					price: adminTicket.price,
					eventId: event.id,
					eventTitle: event.title,
					eventImage: getImage(event.image),
					eventSummary: event.summary,
					eventType: event.type,
					eventCategory: event.category,
					eventSubCategory: event.subCategory,
					qrcode: await qrcode.toDataURL(userTicket.id),
					scanned: userTicket.scanned
				});
			}
		}
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

export async function getAdminTicketForUser(
	eventId: string,
	ticketId: string
) {
	try {
		const event = await prisma.event.findUnique({
			where: {
				id: eventId
			},
			include: {
				tickets: true
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		const ticket = await prisma.adminTicket.findUnique({
			where: {
				id: ticketId
			}
		});
		if (!ticket || ticket.available <= 0) {
			throw new AppError('Ticket not found', 404);
		}
		if (ticket.eventId !== event.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		return {
			id: ticket.id,
			type: ticket.type,
			description: ticket.description,
			price: ticket.price,
			labels: ticket.labels,
			optionals: ticket.optionals,
			eventId: event.id,
			eventTitle: event.title
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
