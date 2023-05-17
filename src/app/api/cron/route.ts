import prisma from '@/lib/server/prisma';
import { transporter } from '@/lib/server/mail';
import { getTicketsDetails } from '@/utils/tickets';
import { formatDateWithAmPm } from '@/utils/date';

export default async function cron() {
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
				from: 'Eventmate <nsvegur01@gmail.com>',
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
	} catch (err) {
		console.warn('🔫 Error in cron job');
		console.error(err);
	}
}
