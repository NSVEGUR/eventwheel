import { catchAsync } from '@/lib/server/catchAsync';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/server/stripe';

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
	const event = await prisma.event.findUnique({
		where: {
			id: params.eventId
		}
	});
	if (!event) {
		throw new AppError('Event not found', 404);
	}
	const ticket = await prisma.adminTicket.findUnique({
		where: {
			id: params.ticketId
		}
	});
	if (!ticket || ticket.eventId !== event.id) {
		throw new AppError('Ticket not found', 404);
	}
	const unit_decimal_amount = ticket.price * 100;
	const stripePrice = await stripe.prices.create({
		product: ticket.productId,
		currency: 'cad',
		unit_amount_decimal: unit_decimal_amount.toString()
	});
	const session = await stripe.checkout.sessions.create({
		line_items: [{ price: stripePrice.id, quantity: 1 }],
		mode: 'payment',
		phone_number_collection: {
			enabled: true
		},
		success_url: process.env.NEXT_PUBLIC_URL + '/success',
		cancel_url: process.env.NEXT_PUBLIC_URL + '/cancel'
	});
	return NextResponse.json({
		url:
			session.url ?? process.env.NEXT_PUBLIC_URL + '/cancel'
	});
});
