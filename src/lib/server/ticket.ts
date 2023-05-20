import prisma from '@/lib/server/prisma';
import { AppError } from '@/lib/server/exception';
import { createServerClient } from '@/utils/supabase-server';

export async function getTicket(
	eventId: string,
	ticketId: string
) {
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
}
