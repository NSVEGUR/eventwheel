import { AdminTicket, UserTicket } from '@prisma/client';
import { forwardRef } from 'react';

export default forwardRef(function TicketsAdminDetails(
	{
		ticket
	}: {
		ticket: AdminTicket & {
			tickets: UserTicket[];
		};
	},
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<div
			id="ticket-details"
			className="flex flex-col gap-10"
			ref={ref}
		>
			<div>
				<h1 className="mb-5 text-3xl font-bold text-accent">
					Customer Details
				</h1>
				{ticket.labels.length > 0 ? (
					<>
						<ul
							className="grid h-10 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium -xl:text-xs -md:text-[0.6rem]"
							style={{
								gridTemplateColumns: `repeat(${ticket.labels.length}, minmax(0, 1fr))`
							}}
						>
							{ticket.labels.map((label, index) => {
								return (
									<li
										className="place-self-start"
										key={index}
									>
										<span>{label}</span>
									</li>
								);
							})}
						</ul>
						{ticket.tickets.map(({ values }, index) => {
							return (
								<ul
									className="grid min-h-[40px] place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium -xl:text-xs -md:text-[0.6rem]"
									key={index}
									style={{
										gridTemplateColumns: `repeat(${ticket.labels.length}, minmax(0, 1fr))`
									}}
								>
									{values.map((value, index) => {
										return (
											<li
												className="min-w-0 max-w-full place-self-start truncate"
												key={index}
											>
												<span>{value}</span>
											</li>
										);
									})}
								</ul>
							);
						})}
					</>
				) : (
					<h1 className="text-center text-skin-complementary">
						No Customer Details have been recorded
					</h1>
				)}
			</div>
			<div>
				<h1 className="mb-5 text-3xl font-bold text-accent">
					Stripe Details
				</h1>
				{ticket.tickets.length > 0 ? (
					<>
						<ul className="grid h-10 grid-cols-4 place-content-center border-b-[1px] border-base bg-muted p-1 pl-2 text-sm font-medium -xl:text-xs -md:text-[0.6rem]">
							<li className="place-self-start">
								<span>Id</span>
							</li>
							<li className="place-self-start">
								<span>Email</span>
							</li>
							<li className="place-self-start">
								<span>Name</span>
							</li>
							<li className="place-self-start">
								<span>Phone</span>
							</li>
							{ticket.labels.map((label, index) => {
								return (
									<li
										className="place-self-start"
										key={index}
									>
										<span>{label}</span>
									</li>
								);
							})}
						</ul>
						{ticket.tickets.map(
							({ email, name, phone, slNo }, index) => {
								return (
									<ul
										className="grid min-h-[40px] grid-cols-4 place-content-center border-b-[1px] border-base p-1 pl-2 text-sm font-medium -xl:text-xs -md:text-[0.6rem]"
										key={index}
									>
										<li className="min-w-0 max-w-full place-self-start truncate">
											<span>{slNo}</span>
										</li>
										<li className="min-w-0 max-w-full place-self-start truncate">
											<span>{email}</span>
										</li>
										<li className="min-w-0 max-w-full place-self-start truncate">
											<span>{name}</span>
										</li>
										<li className="min-w-0 max-w-full place-self-start truncate">
											<span>{phone}</span>
										</li>
									</ul>
								);
							}
						)}
					</>
				) : (
					<h1 className="text-center text-skin-complementary">
						No Stripe Details have been recorded
					</h1>
				)}
			</div>
		</div>
	);
});
