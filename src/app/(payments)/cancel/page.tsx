import Link from 'next/link';

export default function Page() {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-10 w-10 text-skin-error"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
				/>
			</svg>

			<h1>Transaction Cancelled / Failure</h1>
			<Link
				href="/"
				className="rounded-md bg-accent p-1 px-2 text-skin-inverted"
			>
				Return to Home
			</Link>
			<h1>
				Don`t worry, Our team will contact you soon to
				assist if any amount is deducted.
			</h1>
		</>
	);
}
