import 'server-only';
import { getImage } from '@/lib/server/image';
import Image from 'next/image';
import { formatDateWithAmPm } from '@/utils/date';
import FAQ from '@/components/FAQ';
import TicketBuyingCard from '@/components/TicketBuyingCard';
import { getEventUnAuthenticated } from '@/lib/server/event';
import WishlistButton from '@/components/WishlistButton';
import LikeButton from '@/components/LikeButton';
import { getTicketsDetails } from '@/utils/tickets';
import { AppError } from '@/lib/server/exception';
import { formatDate } from '@/utils/date';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: {
		eventId: string;
	};
}) {
	const { liked, ...event } = await getEventUnAuthenticated(
		params.eventId
	);
	const { available } = getTicketsDetails(event.tickets);
	event.image = getImage(event.image);
	const currentDate = new Date();
	if (!event.publishDate) {
		throw new AppError('Event is not published yet', 400);
	}
	return (
		<>
			<div className="fixed bottom-14 right-5 grid h-9 w-9 place-items-center rounded-full bg-gradient-mesh md:hidden">
				<LikeButton {...{ liked, eventId: event.id }} />
			</div>
			{available > 0 && (
				<div className="fixed bottom-1 z-10 w-full bg-dominant px-2 md:hidden">
					<a
						href="#tickets"
						className="flex w-full items-center justify-center scroll-smooth rounded-md bg-accent p-2 text-center font-medium text-skin-inverted"
					>
						Buy Now
					</a>
				</div>
			)}
			<section className="h-full w-full px-28 -md:px-3">
				<div className="flex flex-col gap-5 py-10">
					{event.publishDate < currentDate ? (
						<>
							<h1 className="text-center text-4xl font-bold md:hidden">
								{event.title}
							</h1>
							<div className="flex items-center justify-evenly -md:hidden">
								<div>
									<WishlistButton
										{...{ eventId: event.id, liked }}
									/>
								</div>
								<h1 className="text-center text-4xl font-bold">
									{event.title}
								</h1>
								{available > 0 && (
									<a
										href="#tickets"
										className="flex items-center justify-center rounded-md border-[2px] border-accent bg-accent p-2 font-medium text-skin-inverted"
									>
										Buy Now
									</a>
								)}
							</div>
							<div className="relative mt-5 h-96 w-full overflow-hidden rounded-lg bg-muted">
								{event.image && (
									<Image
										src={event.image}
										alt="Event Image"
										fill={true}
										className=" object-cover "
									/>
								)}
							</div>
							<section className="flex w-full justify-between">
								<div className="flex flex-col items-start gap-2">
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
								<div className="flex flex-col items-end gap-2">
									<h1 className="flex items-baseline gap-1">
										Venue:{' '}
										<span className="text-skin-complementary">
											{event.location}
										</span>
									</h1>
									{event.displayStart && (
										<h1 className="flex items-baseline gap-1">
											Starts:{' '}
											<span className="text-skin-complementary">
												{formatDateWithAmPm(event.starts)}
											</span>
										</h1>
									)}
									{event.displayEnd && (
										<h1 className="flex items-baseline gap-1">
											Ends:{' '}
											<span className="text-skin-complementary">
												{formatDateWithAmPm(event.ends)}
											</span>
										</h1>
									)}
								</div>
							</section>
							<section className="mt-5 flex flex-col gap-10">
								{event.summary && (
									<div>
										<h1 className="mb-5 text-2xl font-medium text-accent">
											Summary
										</h1>
										<p className="text-skin-complementary">
											{event.summary}
										</p>
									</div>
								)}
								{event.description && (
									<div>
										<h1 className="mb-5 text-2xl font-medium text-accent">
											Description
										</h1>
										<p className="text-skin-complementary">
											{event.description}
										</p>
									</div>
								)}
							</section>
							<section className="my-5 flex flex-col gap-5">
								<h1 className="text-center text-3xl font-bold text-accent">
									Tickets
								</h1>
								<div
									className="flex flex-wrap items-center justify-evenly gap-3"
									id="tickets"
								>
									{event.tickets.map((ticket, index) => {
										return (
											<TicketBuyingCard
												key={index}
												{...{
													eventId: params.eventId,
													ticket
												}}
											/>
										);
									})}
								</div>
							</section>
							<section className="my-5">
								<h1 className="mb-10 text-center text-2xl font-bold text-accent">
									FAQ<span className="text-lg">s</span>
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
						</>
					) : (
						<h1 className="text-center text-2xl font-medium text-accent">
							Event coming soon... explore at{' '}
							<span className="text-complementary">
								{formatDate(event.publishDate)}
							</span>
						</h1>
					)}
				</div>
			</section>
		</>
	);
}
