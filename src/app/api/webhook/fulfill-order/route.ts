import { catchAsync } from '@/lib/server/catchAsync';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/server/stripe';
import { prisma } from '@/lib/server/prisma';
import { AppError } from '@/lib/server/exception';
import { ConfirmationTemplate } from '@/lib/templates';
import { formatDate } from '@/utils/date';
import { baseURL } from '@/lib/constants';
import mail from '@sendgrid/mail';
import { CustomInput } from '@/types/ticket';

mail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

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
	try {
		if (event.type == 'checkout.session.completed') {
			// get data object
			const checkoutSession = event.data.object as any;
			const session =
				await stripe.checkout.sessions.retrieve(
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
			const inputs = JSON.parse(
				metadata.inputs
			) as CustomInput[];
			let labels: string[] = [];
			let values: string[] = [];
			if (inputs.length > 0) {
				labels = inputs.map((input) => input.label);
				values = inputs.map((input) => input.value);
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
				},
				include: {
					tickets: true
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
			let stripeUser = await prisma.stripe.findUnique({
				where: {
					email: customer_details.email
				}
			});
			if (!stripeUser) {
				const stripeCustomer =
					await stripe.customers.create({
						email: customer_details.email,
						name: customer_details.name ?? undefined,
						phone: customer_details.phone ?? undefined
					});
				stripeUser = await prisma.stripe.create({
					data: {
						id: stripeCustomer.id,
						email: customer_details.email,
						name: customer_details.name,
						phone: customer_details.phone,
						userId: user?.id
					}
				});
			} else {
				stripeUser = await prisma.stripe.update({
					where: {
						id: stripeUser.id
					},
					data: {
						userId: user?.id
					}
				});
			}
			const userTicket = await prisma.userTicket.create({
				data: {
					userId: user?.id,
					ticketId: ticket.id,
					slNo: ticket.tickets.length + 1,
					checkoutSessionId: session.id,
					email: customer_details.email,
					name: customer_details.name,
					phone: customer_details.phone,
					labels,
					values
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
			const html = ConfirmationTemplate.replace(
				'$EVENT_TITLE$',
				currentEvent.title
			)
				.replace('$EVENT_LINK$', baseURL + currentEvent.id)
				.replace('$EVENT_LOCATION$', currentEvent.location)
				.replace(
					'$EVENT_STARTS$',
					formatDate(currentEvent.starts)
				)
				.replace(
					'$TICKET_LINK$',
					baseURL + `tickets/${userTicket.id}`
				);
			const data = {
				from: 'noreply@eventwheel.ca',
				to: customer_details.email,
				subject: 'Booking confirmation',
				html: html
			};
			const info = await mail.send(data);
			return NextResponse.json(
				{
					success: true,
					data: {
						ticket: userTicket,
						user: {
							supabaseUser: user,
							stripeUser
						},
						sendgrid_info: info
					}
				},
				{ status: 200 }
			);
		}
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{
				success: false,
				error: err
			},
			{ status: 500 }
		);
	}
	return NextResponse.json(
		{
			success: true,
			eventType: event.type,
			event: event
		},
		{ status: 200 }
	);
});
