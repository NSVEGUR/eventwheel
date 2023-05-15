import 'server-only';
import { getImage } from '@/lib/server/image';
import Image from 'next/image';
import { formatDateWithAmPm } from '@/utils/date';
import FAQ from '@/components/FAQ';
import TicketBuyingCard from '@/components/TicketBuyingCard';
import { createServerClient } from '@/utils/supabase-server';
import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';

export async function getEvent(id: string) {
	try {
		const event = await prisma.event.findUnique({
			where: {
				id
			},
			include: {
				tickets: true
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		await prisma.event.update({
			where: {
				id: event.id
			},
			data: {
				views: {
					increment: 1
				}
			}
		});
		return event;
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export default async function Page({
	params
}: {
	params: {
		eventId: string;
	};
}) {
	const event = await getEvent(params.eventId);
	event.image = getImage(event.image);
	return (
		<section className="relative w-full overflow-scroll h-screen scroll-smooth">
			<div className="fixed z-10 top-16 left-0 flex w-full px-10 items-center justify-between">
				<button className="p-2 bg-complementary text-skin-inverted rounded-b-md">
					Add to Wishlist
				</button>
				<a
					href="#tickets"
					className="p-2 bg-complementary text-skin-inverted rounded-b-md"
				>
					Buy Now
				</a>
			</div>
			<div className="p-10 flex flex-col gap-5 mb-60">
				<h1 className="text-4xl font-bold text-center">
					{event.title}
				</h1>
				<div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden mt-5">
					{event.image && (
						<Image
							src={event.image}
							alt="Event Image"
							fill={true}
							className=" object-cover "
						/>
					)}
				</div>
				<section className="flex justify-between w-full">
					<div className="flex flex-col gap-2 items-start">
						<h1>
							Type:{' '}
							<span className="text-skin-complementary">
								{event.type}
							</span>
						</h1>
						<h1>
							Category:{' '}
							<span className="text-skin-complementary">
								{event.category}
							</span>
						</h1>
						{event.subCategory && (
							<h1>
								Sub Category:{' '}
								<span className="text-skin-complementary">
									{event.subCategory}
								</span>
							</h1>
						)}
					</div>
					<div className="flex flex-col gap-2 items-end">
						<h1 className="flex items-baseline gap-1">
							Venue:{' '}
							<span className="text-skin-complementary">
								{event.location}
							</span>
						</h1>
						<h1 className="flex items-baseline gap-1">
							Starts:{' '}
							<span className="text-skin-complementary">
								{formatDateWithAmPm(event.starts)}
							</span>
						</h1>
						<h1 className="flex items-baseline gap-1">
							Ends:{' '}
							<span className="text-skin-complementary">
								{formatDateWithAmPm(event.ends)}
							</span>
						</h1>
					</div>
				</section>
				<section className="flex flex-col gap-10 mt-5">
					{event.summary && (
						<div>
							<h1 className="text-xl font-medium text-accent">
								Summary
							</h1>
							<p className="text-skin-complementary">
								{event.summary}
							</p>
						</div>
					)}
					{event.description && (
						<div>
							<h1 className="text-xl font-medium text-accent">
								Description
							</h1>
							<p className="text-skin-complementary">
								{event.description}
							</p>
						</div>
					)}
				</section>
				<section className="flex flex-col gap-5">
					<h1 className="text-3xl font-bold text-accent text-center">
						Tickets
					</h1>
					<div
						className={`grid gap-5 ${
							event.tickets.length === 1 && 'grid-cols-1'
						} ${
							event.tickets.length === 2 && 'grid-cols-2'
						} ${
							event.tickets.length >= 3 && 'grid-cols-3'
						}`}
						id="tickets"
					>
						{event.tickets.map((ticket, index) => {
							return (
								<TicketBuyingCard
									key={index}
									{...{ eventId: params.eventId, ticket }}
								/>
							);
						})}
					</div>
				</section>
				<section>
					<h1 className="text-center font-medium text-2xl my-5">
						FAQS
					</h1>
					<FAQ
						{...{
							props: {
								questions: event.questions,
								answers: event.answers
							}
						}}
					></FAQ>
				</section>
			</div>
		</section>
	);
}
