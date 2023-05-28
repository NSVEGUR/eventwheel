'use client';

import EventView, { LikedEvent } from './EventView';
import Link from 'next/link';
import { useState } from 'react';

export interface SearchEvent extends LikedEvent {
	searchTerms: string;
}

export default function Landing({
	events
}: {
	events: SearchEvent[];
}) {
	const [filteredEvents, setFilteredEvents] =
		useState(events);
	const searchEvents = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const searchTerm = e.target.value.toLowerCase() || '';
		const filtered = events.filter((event) => {
			return event.searchTerms
				.toLowerCase()
				.includes(searchTerm);
		});
		setFilteredEvents(filtered);
	};
	return (
		<section className="flex flex-col items-center justify-center">
			<div className="relative flex h-96 w-full flex-col items-center justify-center gap-3 bg-accent bg-gradient-mesh text-center text-skin-inverted">
				<h1 className="text-5xl font-bold -md:text-xl">
					Eventwheel.
				</h1>
				<h3 className="-md:text-sm">
					The affordable and reliable event ticket
					management platform you will ever find
				</h3>
				<div className="flex w-full items-center justify-center gap-3 -md:flex-col">
					<Link
						href="/manage"
						className="w-[150px] rounded-md border-[2px] border-accent bg-transparent p-2 text-center text-accent"
					>
						Manage one
					</Link>
					<Link
						href="/tickets"
						className="w-[150px] rounded-md border-[2px] border-accent bg-accent p-2 text-center"
					>
						Find your next
					</Link>
				</div>
				<div className="mt-5 flex w-[80%] items-center rounded-md bg-white bg-opacity-50 px-2 shadow backdrop-blur-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-5 w-5 text-accent"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
					<input
						type="text"
						className="flex-1 bg-transparent p-2 text-skin-base accent-accent outline-none placeholder:text-accent"
						placeholder="Search for events"
						onChange={searchEvents}
					/>
				</div>
			</div>
			{events.length === 0 ? (
				<div className="flex h-full w-full items-center justify-center">
					<h1 className="text-center text-2xl font-medium text-skin-complementary">
						No Events were found
					</h1>
				</div>
			) : (
				<EventView {...{ events: filteredEvents }} />
			)}
		</section>
	);
}
