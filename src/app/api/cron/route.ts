import prisma from '@/lib/server/prisma';
import { transporter } from '@/lib/server/mail';
import { getTicketsDetails } from '@/utils/tickets';
import { formatDateWithAmPm } from '@/utils/date';
import { NextResponse } from 'next/server';

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
			const message = {
				from: process.env.SMTP_USERNAME,
				to: event.user.email,
				subject: `Daily stats for event ${event.id}`,
				text: `${
					event.title
				} tickets have been sold ${sold} out of ${available} with gross ${gross} as of ${formatDateWithAmPm(
					new Date()
				)}`
			};
			await transporter.sendMail(message);
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
