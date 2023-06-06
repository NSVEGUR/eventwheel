/* eslint-disable @next/next/no-img-element */
import 'server-only';
import { getEvent } from '@/lib/server/event';
import FAQ from '@/components/FAQ';
import PublishForm from '@/components/PublishForm';
import { getImage } from '@/lib/server/image';
import GetDate from '@/components/GetDate';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	const imgUrl = getImage(event.image);
	return (
		<section className="relative h-screen w-full overflow-scroll">
			<div className="mb-60 flex flex-col gap-5 p-10 -sm:px-1">
				<h1 className="text-center text-4xl font-bold">
					{event.title}
				</h1>
				<div className="relative mt-5 h-80 w-full overflow-hidden rounded-lg bg-muted">
					{imgUrl && (
						<>
							<img
								src={imgUrl}
								alt="Event Image"
								className="absolute inset-0 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 h-full w-full bg-black bg-opacity-50 backdrop-blur-lg"></div>
							<img
								src={imgUrl}
								alt="Event Image"
								className="absolute inset-0 h-full w-full object-contain"
							/>
						</>
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
						<h1 className="flex items-baseline gap-1">
							Starts:{' '}
							<span className="text-skin-complementary">
								<GetDate date={event.starts} />
							</span>
						</h1>
						<h1 className="flex items-baseline gap-1">
							Ends:{' '}
							<span className="text-skin-complementary">
								<GetDate date={event.ends} />
							</span>
						</h1>
					</div>
				</section>
				<section className="mt-5 flex flex-col gap-10">
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
					<h1 className="text-center text-3xl font-bold text-accent">
						Tickets
					</h1>
					<div
						className="flex flex-wrap items-center justify-center gap-10"
						id="tickets"
					>
						{event.tickets.map((ticket, index) => {
							return (
								<div
									key={index}
									className="relative flex flex-col items-start justify-center gap-3 rounded-md border-[1px] border-base p-10 text-accent shadow-md"
								>
									<h1 className="text-3xl font-medium text-accent">
										{ticket.type}
									</h1>
									<p className="text-sm text-skin-complementary">
										{ticket.description}
									</p>
									<h3 className="text-skin-complementary">
										Available:{' '}
										<span className="font-medium text-accent">
											{ticket.available}
										</span>
									</h3>
									<h3>
										Price:{' '}
										<span className="text-3xl font-medium text-complementary">
											$ {ticket.price}
										</span>
									</h3>
									<button className="mt-5 self-center bg-accent p-3 text-skin-inverted">
										Buy Now
									</button>
								</div>
							);
						})}
					</div>
				</section>
				<section>
					<h1 className="my-5 text-center text-2xl font-medium">
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
				<PublishForm {...{ event }} />
			</div>
		</section>
	);
}
