import 'server-only';
import { getAdminTicketForUser } from '@/lib/server/ticket';
import CustomCheckoutForm from '@/components/CustomCheckoutForm';
import { AppError } from '@/lib/server/exception';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: {
		eventId: string;
		ticketId: string;
	};
}) {
	const ticket = await getAdminTicketForUser(
		params.eventId,
		params.ticketId
	);
	if (ticket.labels.length <= 0) {
		throw new AppError(
			'No custom-checkout is available for this ticket',
			400
		);
	}
	return (
		<main className="flex h-full w-full flex-col items-center justify-center gap-10 -md:my-5">
			{ticket.available - ticket.sold <= 0 ? (
				<h1 className="text-3xl font-bold text-skin-error -md:text-base">
					Tickets have been sold out ⏳... for{' '}
					<span className="text-accent">
						{ticket.eventTitle}
					</span>
				</h1>
			) : (
				<>
					<h1 className="text-3xl text-complementary -md:text-base">
						Checkout Form for{' '}
						<span className="font-medium text-accent">
							{ticket.eventTitle}
						</span>
					</h1>
					<CustomCheckoutForm {...ticket} />
				</>
			)}
		</main>
	);
}
