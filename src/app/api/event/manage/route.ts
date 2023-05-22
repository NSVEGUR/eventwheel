import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@prisma/client';
import { catchAsync } from '@/lib/server/catchAsync';
import prisma from '@/lib/server/prisma';
import { AppError } from '@/lib/server/exception';
import { createServerClient } from '@/utils/supabase-server';

export const POST = catchAsync(async function (
	req: NextRequest
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
	const { userId, id, ...body } =
		(await req.json()) as Event;
	const event = await prisma.event.create({
		data: {
			userId: user.id,
			...body
		}
	});
	return NextResponse.redirect(
		process.env.NEXT_PUBLIC_URL + `manage/${event.id}`
	);
});