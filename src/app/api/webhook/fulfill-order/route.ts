import { catchAsync } from '@/lib/server/catchAsync';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/server/stripe';
import { prisma } from '@/lib/server/prisma';
import { AppError } from '@/lib/server/exception';
import { transporter } from '@/lib/server/mail';
import { ConfirmationTemplate } from '@/lib/templates';
import { formatDateWithAmPm } from '@/utils/date';
import { baseURL } from '@/lib/constants';

export const POST = catchAsync(async (req: Request) => {
	const payload = await req.text();
	const signature = req.headers.get('stripe-signature');
	let event;
	if (!payload || !signature) {
		return NextResponse.json(
			{
				error: 'Invalid Body'
			},
			{ status: 400 }
		);
	}
	try {
		event = stripe.webhooks.constructEvent(
			payload,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET ?? ''
		);
	} catch (err) {
		console.warn(
			'🚧 Webhook signature verification failed'
		);
		console.error(err);
		return NextResponse.json(
			{ message: 'Webhook verification error', error: err },
			{ status: 400 }
		);
	}
	if (event.type == 'checkout.session.completed') {
		// get data object
		const checkoutSession = event.data.object as any;
		const session = await stripe.checkout.sessions.retrieve(
			checkoutSession.id,
			{
				expand: ['line_items']
			}
		);
		const {
			amount_total,
			customer_details,
			line_items,
			metadata
		} = session;
		if (
			!amount_total ||
			!line_items ||
			line_items.data.length <= 0 ||
			!metadata
		) {
			throw new AppError(
				'Invalid line items or metadata',
				400
			);
		}

		const { price } = line_items.data[0];
		if (
			!price ||
			!price.product ||
			!customer_details ||
			!customer_details.email
		) {
			throw new AppError(
				'Invalid price or customer details',
				400
			);
		}
		const ticket = await prisma.adminTicket.findUnique({
			where: {
				productId: price.product.toString()
			}
		});
		if (!ticket) {
			throw new AppError('Ticket not found', 404);
		}
		const currentEvent = await prisma.event.findUnique({
			where: {
				id: ticket.eventId
			}
		});
		if (!currentEvent) {
			throw new AppError('Event not found', 404);
		}
		const user = await prisma.user.findUnique({
			where: {
				email: customer_details.email
			}
		});
		const userTicket = await prisma.userTicket.create({
			data: {
				userId: user?.id,
				ticketId: ticket.id,
				email: customer_details.email,
				name: customer_details.name,
				phone: customer_details.phone
			}
		});
		await prisma.adminTicket.update({
			where: {
				id: ticket.id
			},
			data: {
				sold: {
					increment: 1
				}
			}
		});
		const message = {
			from: process.env.SMTP_USERNAME,
			to: customer_details.email,
			subject: 'Booking confirmation',
			html: ConfirmationTemplate.replace(
				'$EVENT_TITLE$',
				currentEvent.title
			)
				.replace('$EVENT_LINK$', baseURL + currentEvent.id)
				.replace('$EVENT_LOCATION$', currentEvent.location)
				.replace(
					'$EVENT_STARTS$',
					formatDateWithAmPm(currentEvent.starts)
				)
				.replace(
					'$TICKET_LINK$',
					baseURL + `tickets/${userTicket.id}`
				)
		};
		const info = await transporter.sendMail(message);
		return NextResponse.json(
			{
				success: true,
				data: {
					ticket: userTicket,
					guestUser: user ? false : true,
					smtp_info: info
				}
			},
			{ status: 200 }
		);
	}

	throw new AppError(
		`Haven't found operation to perform, triggered by ${event.type}`,
		406
	);
});
