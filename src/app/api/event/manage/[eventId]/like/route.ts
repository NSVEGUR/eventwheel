import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextResponse, NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export const PUT = catchAsync(async function (
	req: NextRequest,
	{ params }: { params: { eventId: string } }
) {
	const tag = req.nextUrl.searchParams.get('tag');
	if (tag) {
		revalidateTag(tag);
	}
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
	if (!event) {
		throw new AppError('Event not found', 404);
	}
	await prisma.event.update({
		where: {
			id: event.id
		},
		data: {
			likedUsers: {
				connect: [{ id: user.id }]
			}
		}
	});
	return NextResponse.json(
		{
			success: true,
			revalidated: true,
			now: Date.now(),
			message: 'Added the event to wishlist successfully'
		},
		{ status: 201 }
	);
});

export const DELETE = catchAsync(async function (
	req: NextRequest,
	{ params }: { params: { eventId: string } }
) {
	const tag = req.nextUrl.searchParams.get('tag');
	if (tag) {
		revalidateTag(tag);
	}
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
	if (!event) {
		throw new AppError('Event not found', 404);
	}
	await prisma.event.update({
		where: {
			id: event.id
		},
		data: {
			likedUsers: {
				disconnect: [{ id: user.id }]
			}
		}
	});
	return NextResponse.json(
		{
			success: true,
			revalidated: true,
			now: Date.now(),
			message:
				'Removed the event from wishlist successfully'
		},
		{ status: 201 }
	);
});
