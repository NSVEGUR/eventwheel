'use client';

import { AdminTicket } from '@prisma/client';
import { useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';

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
				`/api/event/${eventId}/buy/${ticket.id}`,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				}
			);
			if (response.status >= 200 && response.status < 400) {
				setSnackbar({
					message: 'Checked Out...',
					type: 'success'
				});
				const result = await response.json();
				return router.push(result.url);
			} else {
				setSnackbar({
					message: response.statusText,
					type: 'failure'
				});
				return;
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="relative p-10 border-[1px] border-base text-accent flex flex-col gap-3 items-start justify-center rounded-md shadow-md">
			<h1 className="text-3xl font-medium text-accent">
				{ticket.type}
			</h1>
			<p className="text-skin-complementary text-sm">
				{ticket.description}
			</p>
			<h3 className="text-skin-complementary">
				Available:{' '}
				<span className="text-accent font-medium">
					{ticket.available - ticket.sold} /{' '}
					{ticket.available}
				</span>
			</h3>
			<h3>
				Price:{' '}
				<span className="text-complementary text-3xl font-medium">
					$ {ticket.price}
				</span>
			</h3>
			<form
				onSubmit={handleSubmit}
				className="flex w-full items-center justify-center"
			>
				<input
					className="self-center p-3 bg-accent text-skin-inverted mt-5 cursor-pointer"
					type="submit"
					value="Buy Now"
				/>
			</form>
		</div>
	);
}
