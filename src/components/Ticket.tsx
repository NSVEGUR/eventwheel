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
			<div className="flex w-[350px] flex-col gap-3 break-words rounded-md bg-dominant p-5 shadow-md -sm:w-[250px]">
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
					<div className="relative h-40 w-40">
						<Image
							src={ticket.qrcode}
							alt="QRCode"
							fill
						></Image>
					</div>
				</div>
				<h1>
					Price:{' '}
					<span className="text-base font-bold text-complementary">
						$ {(ticket.price + serviceCharge).toFixed(2)}{' '}
						<span className="text-xs font-light text-skin-complementary">
							(incl. service & convenience fee)
						</span>
					</span>
				</h1>
				<h1>
					TicketNo:{' '}
					<span className="text-skin-complementary">
						{ticket.slNo}
					</span>
				</h1>
				{ticket.labels.length > 0 && (
					<>
						<h1 className="font-bold text-accent">
							Customer Details
						</h1>
						{ticket.labels.map((label, index) => {
							return (
								<h1 key={index}>
									{label}:{' '}
									<span className="text-skin-complementary">
										{ticket.values[index] ?? 'undefined'}
									</span>
								</h1>
							);
						})}
					</>
				)}
				<h1 className="font-bold text-accent">
					Purchase Details
				</h1>
				<h1 className="text-sm">
					Name:{' '}
					<span className="text-skin-complementary">
						{ticket.name ?? 'undefined'}
					</span>
				</h1>
				<h1 className="text-sm">
					Email:{' '}
					<span className="text-skin-complementary">
						{ticket.email}
					</span>
				</h1>
				<h1 className="text-sm">
					Phone:{' '}
					<span className="text-skin-complementary">
						{ticket.phone ?? 'undefined'}
					</span>
				</h1>
			</div>
		</div>
	);
});
