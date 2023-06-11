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
	gross = parseFloat(gross.toFixed(2));
	const availability = available - sold > 0;
	return { sold, gross, available, availability };
};
