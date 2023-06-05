'use client';
import { serviceCharge } from '@/lib/constants';
import { UserTicket } from '@/types/ticket';
import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';

export default forwardRef(function Ticket(
	{
		ticket
	}: {
		ticket: UserTicket;
	},
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<div id="ticket" ref={ref}>
			<div className="flex w-[350px] flex-col gap-3 rounded-md bg-dominant p-5 shadow-md -sm:w-[250px]">
				<div className="flex gap-1">
					<div className="relative h-10 w-10 rounded-md bg-muted">
						{ticket.eventImage && (
							<Image
								src={ticket.eventImage}
								alt="Event image"
								fill
								className="rounded-md object-cover"
							/>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<h1 className="text-sm font-bold">
							{ticket.eventTitle}
						</h1>
						<h2 className="text-sm">
							Type:{' '}
							<span className="font-medium text-complementary">
								{ticket.type}
							</span>
						</h2>
					</div>
				</div>
				<div className="flex w-full justify-center">
					<div className="relative h-20 w-20">
						<Image
							src={ticket.qrcode}
							alt="QRCode"
							fill
						></Image>
					</div>
				</div>
				<h1>
					Ticket Price:{' '}
					<span className="text-base font-bold text-complementary">
						$ {ticket.price}
					</span>
				</h1>
				<h1>
					Service Fee:{' '}
					<span className="text-base font-bold text-complementary">
						$ {serviceCharge}
					</span>
				</h1>
				<h1>
					TicketId:{' '}
					<span className="text-skin-complementary">
						{ticket.id}
					</span>
				</h1>
				<h1>
					Name:{' '}
					<span className="text-skin-complementary">
						{ticket.name ?? 'undefined'}
					</span>
				</h1>
				<h1>
					Email:{' '}
					<span className="text-skin-complementary">
						{ticket.email}
					</span>
				</h1>
				<h1>
					Phone:{' '}
					<span className="text-skin-complementary">
						{ticket.phone ?? 'undefined'}
					</span>
				</h1>
			</div>
		</div>
	);
});
