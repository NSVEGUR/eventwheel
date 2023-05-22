'use client';
import { baseURL } from '@/lib/constants';
import { useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { Event } from '@prisma/client';

export default function ShareMenuManage({
	event
}: {
	event: Event;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const url = baseURL + event.id;
	return (
		<>
			<div className="flex flex-col gap-2">
				<h1 className="font-medium">Event URL</h1>
				<div className="flex flex-wrap gap-2">
					<h2>{url}</h2>
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
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-5 w-5 text-complementary"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h1 className="font-medium">Share On</h1>
				<div className="flex gap-3 text-accent">
					<a
						href={`https://www.facebook.com/share.php?u=${url}`}
						title={event.title}
					>
						<i className="fab fa-facebook-f"></i>
					</a>
					<a
						href={`https://twitter.com/share?url=${url}&text=${event.title}`}
						title={event.title}
					>
						<i className="fab fa-twitter"></i>
					</a>
					<a
						href={`mailto:?subject=Sharing ${event.title}&amp;body=Check out this event ${url}`}
						title={event.title}
					>
						<i className="fas fa-envelope"></i>
					</a>
					<a
						href={`https://linkedin.com/sharing/share-offsite/?url=${url}`}
						title={event.title}
					>
						<i className="fab fa-linkedin-in"></i>
					</a>
					<a href={`whatsapp://send?text=${url}`}>
						<i className="fab fa-whatsapp"></i>
					</a>
				</div>
			</div>
		</>
	);
}
