'use client';

import { useState, useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';

export default function WishlistButton({
	eventId,
	liked
}: {
	eventId: string;
	liked: boolean | undefined;
}) {
	const [submitting, setSubmitting] = useState(false);
	const [likedState, setLikedState] = useState(liked);
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const handleSubmit = async function (e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		setSnackbar({
			message: likedState
				? 'Removing from wishlist...'
				: 'Adding to wishlist...',
			type: 'promise'
		});
		try {
			const response = await fetch(
				`/api/event/manage/${eventId}/like`,
				{
					method: likedState ? 'DELETE' : 'PUT',
					headers: {
						'content-type': 'application/json'
					},
					next: {
						tags: ['like']
					}
				}
			);
			if (response.status >= 200 && response.status < 400) {
				console.log('this is running positive');
				setSnackbar({
					message: likedState
						? 'Removed from wishlist'
						: 'Added to wishlist',
					type: 'success'
				});
				setLikedState(!likedState);
				setSubmitting(false);
				return router.refresh();
			}
			if (response.status === 401) {
				const result = await response.json();
				setSnackbar({
					message:
						result.message ??
						'Something went wrong 💥, login again to continue',
					type: 'failure'
				});
				return router.push(result.url);
			}
			return setSnackbar({
				message:
					'Something went wrong 💥, login again to continue',
				type: 'failure'
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				className={`${
					submitting ? 'hidden' : 'flex'
				} items-center justify-center rounded-md border-[2px] border-accent bg-transparent p-2 font-medium text-accent`}
				type="submit"
				value={
					likedState
						? 'Remove from wishlist'
						: 'Add to wishlist'
				}
			/>
		</form>
	);
}
