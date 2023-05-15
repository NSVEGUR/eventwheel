'use client';

import { Event, AdminTicket } from '@prisma/client';
import Link from 'next/link';
import { useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';

export default function PublishForm({
	event
}: {
	event: Event & {
		tickets: AdminTicket[];
	};
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const handleSubmit = async function (e: React.FormEvent) {
		e.preventDefault();
		if (!event.image) {
			return setSnackbar({
				message: 'Please upload image before publishing',
				type: 'failure'
			});
		}
		if (!event.summary) {
			return setSnackbar({
				message: 'Please add summary before publishing',
				type: 'failure'
			});
		}
		if (!event.description) {
			return setSnackbar({
				message: 'Please add summary before publishing',
				type: 'failure'
			});
		}
		if (event.tickets.length === 0) {
			return setSnackbar({
				message:
					'Please create at least one ticket before publishing',
				type: 'failure'
			});
		}
		try {
			setSnackbar({
				message: 'Publishing the event',
				type: 'promise'
			});
			const response = await fetch(
				`/api/event/${event.id}/publish`,
				{
					method: 'POST'
				}
			);
			if (response.status >= 200 && response.status < 300) {
				setSnackbar({
					message: 'Published Successfully',
					type: 'success'
				});
				return router.push(response.url);
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
		<form
			className="fixed right-0 bottom-0 left-0 h-16 bg-dominant border-t-[1px]"
			onSubmit={handleSubmit}
		>
			<div className="flex w-full h-full justify-end items-center gap-5 pr-10">
				<Link
					className="px-2 py-1 border-[1px] border-accent rounded-md"
					href={`/manage/${event.id}`}
				>
					Dashboard
				</Link>
				<input
					className="px-2 py-1 border-[1px] border-accent bg-accent text-skin-inverted rounded-md cursor-pointer"
					type="submit"
					value="Publish"
				/>
			</div>
		</form>
	);
}
