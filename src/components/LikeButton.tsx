'use client';

import { useState, useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useAuth } from './providers/supabase-auth-provider';
import { useRouter } from 'next/navigation';

export default function LikeButton({
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
	const handleSubmit = async function (
		e: React.MouseEvent<HTMLButtonElement>
	) {
		e.preventDefault();
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
				router.push(result.url);
				return;
			}
			setSnackbar({
				message:
					'Something went wrong 💥, login again to continue',
				type: 'failure'
			});
			return;
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form>
			<button
				className={`${
					submitting ? 'hidden' : 'flex'
				} h-7 w-7 items-center justify-center rounded-full bg-dominant text-accent`}
				type="submit"
				onClick={handleSubmit}
			>
				{likedState ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-5 w-5"
					>
						<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-5 w-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>
				)}
			</button>
		</form>
	);
}
