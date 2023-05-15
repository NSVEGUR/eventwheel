import { AppError } from '@/lib/server/exception';
import prisma from '@/lib/server/prisma';
import { createServerClient } from '@/utils/supabase-server';
import { formatDateWithAmPm } from '@/utils/date';

export const revalidate = 30;

async function getWithdrawals(id: string) {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication failed, login to continue',
				401
			);
		}
		const event = await prisma.event.findUnique({
			where: {
				id
			},
			include: {
				withdrawalRequests: true
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		if (event.userId != user.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		const { withdrawalRequests, ...others } = event;
		return { withdrawalRequests, others };
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
	params: { eventId: string };
}) {
	const { withdrawalRequests, others: event } =
		await getWithdrawals(params.eventId);
	return (
		<div className="flex flex-col p-5">
			<h1 className="text-4xl font-bold">Events</h1>
			<ul className="p-1 pl-2 h-10 grid grid-cols-7 place-content-center text-sm font-medium bg-muted border-b-[1px] border-base mt-10">
				<li className="place-self-start flex items-center gap-1">
					<span>Id</span>
				</li>
				<li className="place-self-start flex items-center gap-1">
					<span>Transit Number</span>
				</li>
				<li className="place-self-start">
					<span>Institution Number</span>
				</li>
				<li className="place-self-start">
					<span>Account Number</span>
				</li>
				<li className="place-self-start">
					<span>Amount ($)</span>
				</li>
				<li className="place-self-start">
					<span>Created At</span>
				</li>
				<li className="place-self-start">
					<span>Status</span>
				</li>
			</ul>
			{withdrawalRequests.map((withdrawal, index) => {
				return (
					<ul
						className="p-1 pl-2 h-10 grid grid-cols-7 place-content-center text-sm font-medium border-b-[1px] border-base"
						key={index}
					>
						<li className="place-self-start flex items-center gap-1">
							<span>{withdrawal.id}</span>
						</li>
						<li className="place-self-start">
							<span>{withdrawal.transitNumber}</span>
						</li>
						<li className="place-self-start flex items-center gap-1">
							<span>{withdrawal.institutionNumber}</span>
						</li>
						<li className="place-self-start">
							<span>{withdrawal.accountNumber}</span>
						</li>
						<li className="place-self-start">
							<span>{withdrawal.amount}</span>
						</li>
						<li className="place-self-start">
							<span>
								{formatDateWithAmPm(withdrawal.createdAt)}
							</span>
						</li>
						<li className="place-self-start">
							<span>
								{withdrawal.approved
									? 'Approved'
									: 'In Process'}
							</span>
						</li>
					</ul>
				);
			})}
		</div>
	);
}
