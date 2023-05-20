import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { AdminTicket } from '@prisma/client';
import { baseURL } from '@/lib/constants';
import { stripe } from '@/lib/server/stripe';

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
	const { type, description, price, available } =
		(await req.json()) as AdminTicket;
	console.log(
		'ticket creation',
		type,
		description,
		price,
		available
	);
	const stripeProduct = await stripe.products.create({
		name: type,
		description: description
	});
	await prisma.adminTicket.create({
		data: {
			eventId: event.id,
			productId: stripeProduct.id,
			price: price,
			available: available,
			type: type,
			description: description
		}
	});

	return NextResponse.redirect(
		baseURL + `manage/${event.id}/tickets`
	);
});

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
	const { ticketId, ...body } = await req.json();
	const { price, available, type, description } =
		body as AdminTicket;
	const event = await prisma.event.findUnique({
		where: {
			id: params.eventId
		}
	});
	if (!event || event.userId != user.id) {
		throw new AppError('Event not found', 404);
	}
	const ticket = await prisma.adminTicket.findUnique({
		where: {
			id: ticketId
		}
	});
	if (!ticket || ticket.eventId != event.id) {
		throw new AppError('Ticket not found', 404);
	}
	const updatedTicket = await prisma.adminTicket.update({
		where: {
			id: ticket.id
		},
		data: {
			type,
			description,
			price: price,
			available: available
		}
	});
	await stripe.products.update(updatedTicket.productId, {
		name: updatedTicket.type,
		description: updatedTicket.description
	});
	return NextResponse.redirect(
		baseURL + `manage/${event.id}/tickets`
	);
});
