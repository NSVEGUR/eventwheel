'use client';

import { useState, useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useAuth } from './providers/supabase-auth-provider';
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
	const { user } = useAuth();
	const router = useRouter();
	const handleSubmit = async function (e: React.FormEvent) {
		if (!user) {
			setSnackbar({
				message:
					'Authentication required, login to continue',
				type: 'failure'
			});
			return router.push('/signin');
		}
		setSubmitting(true);
		setSnackbar({
			message: likedState
				? 'Removing from wishlist...'
				: 'Adding to wishlist...',
			type: 'promise'
		});
		try {
			const response = await fetch(
				`/api/event/${eventId}/like`,
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
				setSnackbar({
					message: likedState
						? 'Removed from wishlist'
						: 'Added to wishlist',
					type: 'success'
				});
				setLikedState(!likedState);
				return router.refresh();
			}
			return setSnackbar({
				message: response.statusText,
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
				} min-w-[150px] items-center justify-center rounded-md border-[2px] border-accent bg-transparent p-2 font-medium text-accent`}
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
