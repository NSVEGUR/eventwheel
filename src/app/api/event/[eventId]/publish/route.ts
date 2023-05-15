import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from '@/lib/constants';

export const POST = catchAsync(async function (
	req: NextRequest,
	{
		params
	}: {
		params: {
			eventId: string;
		};
	}
) {
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
	const event = await prisma.event.findUnique({
		where: {
			id: params.eventId
		},
		include: {
			tickets: true
		}
	});
	if (!event || event.userId != user.id) {
		throw new AppError('Event not found', 404);
	}
	if (
		!event.image ||
		!event.summary ||
		!event.description ||
		event.tickets.length === 0
	) {
		throw new AppError('Not eligible for publishing', 404);
	}
	await prisma.event.update({
		where: {
			id: event.id
		},
		data: {
			published: true
		}
	});
	return NextResponse.redirect(
		baseURL + `manage/${event.id}`
	);
});
