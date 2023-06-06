import prisma from '@/lib/server/prisma';
import { getTicketsDetails } from '@/utils/tickets';
import { NextResponse } from 'next/server';
import { baseURL } from '@/lib/constants';
import { StatsTemplate } from '@/lib/templates';

import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export async function GET() {
	try {
		const events = await prisma.event.findMany({
			where: {
				AND: [
					{
						published: true
					},
					{
						ends: {
							lte: new Date()
						}
					}
				]
			},
			include: {
				user: true,
				likedUsers: true,
				tickets: true
			}
		});
		for (const event of events) {
			const { gross, sold, available } = getTicketsDetails(
				event.tickets
			);
			const html = StatsTemplate.replace(
				'$EVENT_TITLE$',
				event.title
			)
				.replace('$EVENT_LINK$', baseURL + event.id)
				.replace('$TICKET_SOLD$', sold.toString())
				.replace('$TICKET_AVAILABLE$', available.toString())
				.replace('$TICKET_GROSS$', gross.toString())
				.replace(
					'$STATS_LINK$',
					baseURL + `manage/${event.id}`
				);
			const data = {
				from: 'noreply@eventwheel.ca',
				to: event.user.email,
				subject: `Daily stats for event ${event.id}`,
				html
			};
			await mail.send(data);
		}
		return NextResponse.json({
			success: true,
			message: 'Cron job ran successfully 🎉'
		});
	} catch (err) {
		console.warn('🔫 Error in cron job');
		console.error(err);
		return NextResponse.json({
			success: false,
			error: err,
			message: 'Error in executing cron job 💥'
		});
	}
}
