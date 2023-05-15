import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from '@/lib/constants';

export const PATCH = catchAsync(async function (
	req: NextRequest,
	{ params }: { params: { eventId: string } }
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
		}
	});
	if (!event || event.userId != user.id) {
		throw new AppError('Event not found', 404);
	}
	const body = await req.json();
	const {
		summary,
		image,
		description,
		faqs
	}: {
		summary: string;
		image: string | null;
		description: string;
		faqs: {
			question: string;
			answer: string;
		}[];
	} = body;
	const questions = faqs.map((faq) => faq.question);
	const answers = faqs.map((faq) => faq.answer);
	await prisma.event.update({
		where: {
			id: event.id
		},
		data: {
			summary,
			image,
			description,
			questions,
			answers
		}
	});
	return NextResponse.redirect(
		baseURL + `manage/${event.id}`
	);
});
