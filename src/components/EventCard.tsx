import { Event } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateWithAmPm } from '@/utils/date';
import LikeButton from '@/components/LikeButton';

export default function EventCard({
	event,
	liked
}: {
	event: Event;
	liked: boolean | undefined;
}) {
	return (
		<div className="group flex h-96 cursor-pointer flex-col justify-evenly rounded-xl shadow transition-all duration-500 hover:shadow-lg">
			<div className="relative h-[40%] overflow-hidden rounded-t-xl transition-all duration-500 group-hover:h-[50%]">
				{event.image ? (
					<Image
						src={event.image}
						alt="Event image"
						fill
						className="object-cover"
					/>
				) : (
					<div className="h-full w-full bg-muted"></div>
				)}
				<div className="absolute inset-0 hidden h-full w-full bg-black bg-opacity-50 transition-all duration-300 group-hover:block group-hover:animate-fade" />
				<div className="absolute right-2 top-3 flex gap-2">
					<LikeButton {...{ liked, eventId: event.id }} />
					<Link
						href={`/${event.id}`}
						className="flex h-7 w-7 items-center justify-center rounded-full bg-dominant text-accent"
					>
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
								d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
							/>
						</svg>
					</Link>
				</div>
			</div>
			<div className="flex h-[60%] w-full flex-col justify-center gap-2 rounded-b-xl bg-dominant p-5 transition-all duration-500 group-hover:h-[50%]">
				<h1 className="text-xl font-semibold">
					{event.title}
				</h1>
				<p className="text-sm text-complementary">
					{formatDateWithAmPm(event.starts)}
				</p>
				<p className="text-sm font-medium text-accent">
					{event.location}
				</p>
				<div className="flex items-center gap-1 text-xs text-skin-complementary">
					{event.summary}
				</div>
			</div>
		</div>
	);
}
