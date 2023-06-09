import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { AdminTicket } from '@prisma/client';
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
	const {
		type,
		description,
		price,
		available,
		displayAvailable,
		inputs
	} = (await req.json()) as AdminTicket & {
		inputs: {
			label: string;
			optional: boolean;
		}[];
	};
	const labels = inputs.map((input) => input.label);
	const optionals = inputs.map((input) => input.optional);
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
			description: description,
			displayAvailable: displayAvailable,
			labels,
			optionals
		}
	});
	return NextResponse.redirect(
		new URL(`/manage/${event.id}/publish`, req.url)
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
	const {
		price,
		available,
		type,
		description,
		displayAvailable,
		inputs
	} = body as AdminTicket & {
		inputs: {
			label: string;
			optional: boolean;
		}[];
	};
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
	const labels = inputs.map((input) => input.label);
	const optionals = inputs.map((input) => input.optional);
	const updatedTicket = await prisma.adminTicket.update({
		where: {
			id: ticket.id
		},
		data: {
			type,
			description,
			price: price,
			available: available,
			displayAvailable: displayAvailable,
			labels,
			optionals
		}
	});
	await stripe.products.update(updatedTicket.productId, {
		name: updatedTicket.type,
		description: updatedTicket.description
	});
	return NextResponse.redirect(
		new URL(`/manage/${event.id}/publish`, req.url)
	);
});
