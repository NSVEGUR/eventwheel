import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchAsync(async function (
	req: NextRequest,
	{
		params
	}: {
		params: {
			eventId: string;
			ticketId: string;
		};
	}
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
			id: params.eventId
		}
	});
	if (!event || event.userId != user.id) {
		throw new AppError('Event not found', 404);
	}

	const ticket = await prisma.userTicket.findUnique({
		where: {
			id: params.ticketId
		}
	});
	if (!ticket) {
		throw new AppError('Ticket not found', 404);
	}
	if (ticket.scanned) {
		throw new AppError(
			'Ticket has been scanned already',
			400
		);
	}
	await prisma.userTicket.update({
		where: {
			id: ticket.id
		},
		data: {
			scanned: true
		}
	});
	return NextResponse.json(
		{
			success: true,
			message: 'Scanned details successfully'
		},
		{ status: 200 }
	);
});
