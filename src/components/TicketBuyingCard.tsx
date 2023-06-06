'use client';

import { AdminTicket } from '@prisma/client';
import { useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';
import { serviceCharge } from '@/lib/constants';
import Link from 'next/link';

export default function TicketBuyingCard({
	ticket,
	eventId
}: {
	ticket: AdminTicket;
	eventId: string;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSnackbar({
			message: 'Redirecting to the payment page...',
			type: 'promise'
		});
		try {
			const response = await fetch(
				`/api/event/${eventId}/checkout/${ticket.id}`,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify([])
				}
			);
			if (response.status >= 200 && response.status < 400) {
				setSnackbar({
					message: 'Checking out...',
					type: 'success'
				});
				const result = await response.json();
				return router.push(result.url);
			}
			setSnackbar({
				message:
					'Something went wrong 💥, please try again',
				type: 'failure'
			});
			return;
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="group relative flex max-w-md flex-col items-start justify-center gap-3 rounded-lg p-10 text-accent shadow transition-all duration-200 hover:shadow-lg">
			<h1 className="text-3xl font-medium text-accent">
				{ticket.type}
			</h1>
			<p className="text-sm text-skin-complementary">
				{ticket.description}
			</p>
			{ticket.displayAvailable && (
				<h3 className="text-skin-complementary">
					Available:{' '}
					<span className="font-medium text-accent">
						{ticket.available - ticket.sold} /{' '}
						{ticket.available}
					</span>
				</h3>
			)}
			<h3 className="text-base">
				Price:{' '}
				<span className="text-xl font-bold text-complementary transition-all duration-200 group-hover:text-xl">
					{(ticket.price + serviceCharge).toFixed(2)}${' '}
					<span className="text-xs font-normal text-skin-complementary">
						(including service and convenience fee)
					</span>
				</span>
			</h3>
			{ticket.available - ticket.sold > 0 ? (
				<>
					{ticket.labels.length > 0 ? (
						<Link
							className="mt-5 cursor-pointer self-center rounded-md bg-accent p-3 text-skin-inverted transition-transform duration-200 group-hover:scale-110"
							href={`/${ticket.eventId}/custom-checkout/${ticket.id}`}
						>
							Buy Now
						</Link>
					) : (
						<form
							onSubmit={handleSubmit}
							className="flex w-full items-center justify-center"
						>
							<input
								className="mt-5 cursor-pointer self-center rounded-md bg-accent p-3 text-skin-inverted transition-transform duration-200 group-hover:scale-110"
								type="submit"
								value="Buy Now"
							/>
						</form>
					)}
				</>
			) : (
				<p className="text-center text-sm font-medium text-skin-error">
					Tickets are sold out
				</p>
			)}
		</div>
	);
}
