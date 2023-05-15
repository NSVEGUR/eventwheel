import { Event } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

export default function EventCard({
	event
}: {
	event: Event;
}) {
	return (
		<Link
			className="group h-96 shadow-lg transition-all duration-500 rounded-xl flex flex-col cursor-pointer justify-evenly"
			href={event.id}
		>
			<div className="h-[60%] relative group-hover:h-[45%] transition-all duration-500 overflow-hidden rounded-t-xl">
				{event.image ? (
					<Image
						src={event.image}
						alt="Event image"
						fill
						className="object-cover"
					/>
				) : (
					<div className="w-full h-full bg-muted"></div>
				)}
				<div className="absolute h-full w-full inset-0 bg-black bg-opacity-50 transition-all duration-300 hidden group-hover:block group-hover:animate-fade" />
			</div>
			<div className="bg-dominant h-[40%] w-full rounded-b-xl flex flex-col justify-center p-5 gap-2 group-hover:h-[60%] transition-all duration-500">
				<h1 className="font-semibold text-xl">
					{event.title}
				</h1>
				<div className="flex gap-1 items-center text-skin-complementary">
					{event.summary}
				</div>
				<p className="hidden group-hover:line-clamp-3 text-skin-complementary transition-all duration-300 group-hover:animate-fade">
					{event.description}
				</p>
			</div>
		</Link>
	);
}
