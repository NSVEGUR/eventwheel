import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { WithdrawalRequest } from '@prisma/client';

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
	const { id, eventId, approved, createdAt, ...body } =
		(await req.json()) as WithdrawalRequest;
	const withdraw = await prisma.withdrawalRequest.create({
		data: {
			eventId: event.id,
			...body
		}
	});
	return NextResponse.redirect(
		new URL(`manage/${event.id}`, req.url)
	);
});
