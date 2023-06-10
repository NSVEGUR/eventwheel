import 'server-only';
import { AdminTicket, UserTicket } from '@prisma/client';
import Table from '@/components/Table';

export default function TicketsAdminDetails({
	ticket
}: {
	ticket: AdminTicket & {
		tickets: UserTicket[];
	};
}) {
	return (
		<div
			id="ticket-details"
			className="flex flex-col gap-10"
		>
			<Table
				title={'Customer Details'}
				caption={`List of details, customers given via custom
								checkout to the questions provided by you to
								the ${ticket.type} ticket.`}
				header={['id', ...ticket.labels]}
				body={ticket.tickets.map((ticket) => {
					return [ticket.slNo.toString(), ...ticket.values];
				})}
			/>
			<Table
				title={'Purchase Details'}
				caption={`List of details, customers given through
									payment checkout to the ${ticket.type}
									ticket.`}
				header={['id', 'email', 'name', 'phone']}
				body={ticket.tickets.map(
					({ slNo, name, email, phone }) => {
						return [
							slNo.toString(),
							email,
							name || 'N/A',
							phone || 'N/A'
						];
					}
				)}
			/>
		</div>
	);
}
