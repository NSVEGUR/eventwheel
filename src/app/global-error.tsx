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
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-5 text-center">
			<h2 className="font-medium text-accent">
				There was a problem
			</h2>
			<h1 className="text-3xl font-medium text-skin-error transition-all duration-200 hover:scale-110">
				{error.message || 'Something went wrong!'}
			</h1>
			<h2 className="text-accent">
				Please try again later or contact support if the
				problem persists.
			</h2>
			<div className="flex gap-3 -md:flex-col">
				<button
					className="w-[200px] rounded-lg border-2 border-accent p-2"
					onClick={reset}
				>
					Try again
				</button>
				<Link
					className="w-[200px] rounded-lg border-2 border-accent bg-accent p-2 text-center text-skin-inverted"
					href="/signin"
				>
					Login
				</Link>
			</div>
		</main>
	);
};

export default error;
