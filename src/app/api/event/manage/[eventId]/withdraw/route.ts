import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { WithdrawalRequest } from '@prisma/client';
import { WithdrawalTemplate } from '@/lib/templates';
import { baseURL } from '@/lib/constants';

import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

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
	const html = WithdrawalTemplate.replace(
		'$EVENT_TITLE$',
		event.title
	)
		.replace('$EVENT_LINK$', baseURL + event.id)
		.replace('$EVENT_ID$', event.id)
		.replace(
			'$TRANSIT_NUMBER$',
			withdraw.transitNumber.toString()
		)
		.replace(
			'$INSTITUTION_NUMBER$',
			withdraw.institutionNumber.toString()
		)
		.replace(
			'$ACCOUNT_NUMBER$',
			withdraw.accountNumber.toString()
		)
		.replace(
			'$DATABASE_LINK$',
			'https://supabase.com/dashboard/project/qqeismeiigmcbrskvksx/editor'
		);
	const data = {
		from: 'noreply@eventwheel.ca',
		to: 'nsvegur@gmail.com',
		subject: `New withdrawal request for ${event.id}`,
		html
	};
	await mail.send(data);
	return NextResponse.redirect(
		new URL(`/manage/${event.id}`, req.url)
	);
});
