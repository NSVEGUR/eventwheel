'use client';
import { next_generic_error } from '@/lib/constants';
import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-5 text-center">
			<h1 className="text-3xl font-medium text-skin-error transition-all duration-200 hover:scale-110">
				{'Not Found,  404 Error'}
			</h1>
			<h2 className="text-accent">
				The requested resource is not found, please try to
				to contact support if required.
			</h2>
			<div className="flex gap-3 -md:flex-col">
				<Link
					className="w-[200px] rounded-lg border-2 border-accent bg-accent p-2 text-center text-skin-inverted"
					href="/"
				>
					Home
				</Link>
			</div>
		</main>
	);
}
