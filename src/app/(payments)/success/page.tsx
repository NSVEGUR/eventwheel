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
				className="h-10 w-10 text-skin-okay"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h1>Transaction Successful</h1>
			<Link
				href="/"
				className="rounded-md bg-accent p-1 px-2 text-skin-inverted"
			>
				Return to Home
			</Link>
		</>
	);
}
