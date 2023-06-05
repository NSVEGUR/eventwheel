import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@prisma/client';

export const PATCH = catchAsync(async function (
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
			'Authentication required, login to continue',
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
	const { published, publishDate } =
		(await req.json()) as Event;
	await prisma.event.update({
		where: {
			id: event.id
		},
		data: {
			published,
			publishDate
		}
	});
	return NextResponse.redirect(
		new URL(`/manage/${event.id}`, req.url)
	);
});
