'use client';
import Link from 'next/link';

const error = ({
	error,
	reset
}: {
	error: Error;
	reset: () => void;
}) => {
	return (
		<main className="h-screen w-screen flex flex-col items-center justify-center gap-5">
			<h2 className="text-accent font-medium">
				There was a problem
			</h2>
			<h1 className="text-3xl font-medium text-skin-error hover:scale-110 transition-all duration-200">
				{error.message || 'Something went wrong!'}
			</h1>
			<h2 className="text-accent">
				Please try again later or contact support if the
				problem persists.
			</h2>
			<div className="flex gap-3 -md:flex-col">
				<button
					className="p-2 border-2 border-accent rounded-lg w-[200px]"
					onClick={reset}
				>
					Try again
				</button>
				<Link
					className="p-2 border-2 border-accent rounded-lg w-[200px] bg-accent text-skin-inverted text-center"
					href="/"
				>
					Go back home
				</Link>
			</div>
		</main>
	);
};

export default error;
