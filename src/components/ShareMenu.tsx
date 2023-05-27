'use client';
import { useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import Script from 'next/script';

export default function ShareMenu({
	url,
	title
}: {
	url: string;
	title: string;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	return (
		<>
			<div className="flex flex-col gap-2">
				<button
					onClick={() => {
						try {
							navigator.clipboard.writeText(url);
							setSnackbar({
								message: 'Copied to clipboard',
								type: 'success'
							});
						} catch (err) {
							console.error(err);
						}
					}}
					className="flex gap-3 rounded-md bg-accent p-2 text-skin-inverted"
				>
					Copy Link
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
							d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
						/>
					</svg>
				</button>
			</div>
			<div className="flex gap-3 text-accent">
				<a
					href={`https://www.facebook.com/share.php?u=${url}`}
					title={title}
				>
					<i className="fab fa-facebook-f"></i>
				</a>
				<a
					href={`https://twitter.com/share?url=${url}&text=${title}`}
					title={title}
				>
					<i className="fab fa-twitter"></i>
				</a>
				<a
					href={`mailto:?subject=Sharing ${title}&amp;body=Check out this ${url}`}
					title={title}
				>
					<i className="fas fa-envelope"></i>
				</a>
				<a
					href={`https://linkedin.com/sharing/share-offsite/?url=${url}`}
					title={title}
				>
					<i className="fab fa-linkedin-in"></i>
				</a>
				<a
					href={`whatsapp://send?text=${url}`}
					title={title}
				>
					<i className="fab fa-whatsapp"></i>
				</a>
			</div>
			<Script
				src="https://kit.fontawesome.com/549aab17e5.js"
				crossOrigin="anonymous"
			></Script>
		</>
	);
}
