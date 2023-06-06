import { Event, AdminTicket } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import LikeButton from '@/components/LikeButton';
import { getTicketsDetails } from '@/utils/tickets';

export default function EventCard({
	event,
	liked,
	tickets
}: {
	event: Event;
	tickets: AdminTicket[];
	liked: boolean | undefined;
}) {
	const { availability } = getTicketsDetails(tickets);
	return (
		<Link
			href={`/${event.id}`}
			className="group flex h-96 min-w-[250px] cursor-pointer flex-col justify-evenly rounded-xl shadow transition-all duration-500 hover:shadow-lg"
		>
			<div className="relative h-[40%] overflow-hidden rounded-t-xl transition-all duration-500 group-hover:h-[50%]">
				{event.image ? (
					<Image
						src={event.image}
						alt="Event image"
						fill
						className="bg-muted object-cover"
					/>
				) : (
					<div className="h-full w-full bg-muted"></div>
				)}
				<div className="absolute inset-0 hidden h-full w-full bg-black bg-opacity-50 transition-all duration-300 group-hover:block group-hover:animate-fade" />
				<div className="absolute right-2 top-3 flex gap-2">
					<LikeButton {...{ liked, eventId: event.id }} />
				</div>
			</div>
			<div className="flex h-[60%] w-full flex-col justify-center gap-2 rounded-b-xl bg-dominant p-5 transition-all duration-500 group-hover:h-[50%]">
				<h1 className="text-xl font-semibold">
					{event.title}
				</h1>
				{event.displayStart && (
					<p className="text-sm text-complementary">
						{formatDate(event.starts)}
					</p>
				)}
				<p className="text-sm font-medium text-accent">
					{event.location}
				</p>
				<div className="flex items-center gap-1 text-xs text-skin-complementary">
					{event.summary}
				</div>
				{event.recurrence && (
					<div className="text-xs text-skin-complementary">
						Recurrence:{' '}
						<span className=" text-skin-okay">
							{event.recurrence}
						</span>
					</div>
				)}
				{availability ? (
					<p className="text-sm ">Available</p>
				) : (
					<p className="text-sm text-skin-error">
						Sold Out
					</p>
				)}
			</div>
		</Link>
	);
}
