import 'server-only';
import { getEvent } from '@/lib/server/event';
import Image from 'next/image';
import { formatDateWithAmPm } from '@/utils/date';
import FAQ from '@/components/FAQ';
import PublishForm from '@/components/PublishForm';
import { getImage } from '@/lib/server/image';

export const revalidate = 30;

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	const imgUrl = getImage(event.image);
	return (
		<section className="relative w-full overflow-scroll h-screen">
			<div className="p-10 flex flex-col gap-5 mb-60">
				<h1 className="text-4xl font-bold text-center">
					{event.title}
				</h1>
				<div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden mt-5">
					{imgUrl && (
						<Image
							src={imgUrl}
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
								<div
									key={index}
									className="relative p-10 border-[1px] border-base text-accent flex flex-col gap-3 items-start justify-center rounded-md shadow-md"
								>
									<h1 className="text-3xl font-medium text-accent">
										{ticket.type}
									</h1>
									<p className="text-skin-complementary text-sm">
										{ticket.description}
									</p>
									<h3 className="text-skin-complementary">
										Available:{' '}
										<span className="text-accent font-medium">
											{ticket.count}
										</span>
									</h3>
									<h3>
										Price:{' '}
										<span className="text-complementary text-3xl font-medium">
											$ {ticket.price}
										</span>
									</h3>
									<button className="self-center p-3 bg-accent text-skin-inverted mt-5">
										Buy Now
									</button>
								</div>
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
			<PublishForm {...{ event }} />
		</section>
	);
}
