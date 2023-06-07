import 'server-only';
import { getAdminTicketForUser } from '@/lib/server/ticket';
import CustomCheckoutForm from '@/components/CustomCheckoutForm';

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
	return (
		<main className="flex h-full w-full flex-col items-center justify-center gap-10 -md:my-5">
			<h1 className="text-3xl font-medium text-complementary">
				Checkout Form
			</h1>
			<CustomCheckoutForm {...ticket} />
		</main>
	);
}
