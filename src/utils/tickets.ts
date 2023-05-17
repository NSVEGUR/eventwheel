import { AdminTicket } from '@prisma/client';

export const getTicketsDetails = function (
	tickets: AdminTicket[]
) {
	let sold = 0;
	let gross = 0;
	let available = 0;
	for (const ticket of tickets) {
		sold += ticket.sold;
		gross += ticket.sold * ticket.price;
		available += ticket.available;
	}
	return { sold, gross, available };
};
