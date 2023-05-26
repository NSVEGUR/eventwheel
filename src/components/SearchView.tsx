'use client';
import { LikedEvent } from '@/lib/server/event';
import EventCard from '@/components/EventCard';
import Link from 'next/link';
import { useState } from 'react';

export interface SearchEvent extends LikedEvent {
	searchTerms: string;
}

export default function EventView({
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
		<>
			<div className="flex w-full items-center gap-2 px-10 py-2 shadow -sm:px-2">
				<Link href="/" className="text-accent">
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
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<input
					type="text"
					placeholder="Search Events"
					onChange={searchEvents}
					className="flex-1 p-1 outline-none"
				/>
			</div>
			<div className="grid grid-cols-4 gap-5 px-20 py-10 -xl:grid-cols-3 -lg:grid-cols-2 -sm:grid-cols-1 -sm:px-2">
				{filteredEvents.map(
					({ liked, tickets, ...event }) => {
						return (
							<EventCard
								key={event.id}
								{...{ event, liked, tickets }}
							/>
						);
					}
				)}
			</div>
		</>
	);
}
