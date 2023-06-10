'use client';
import { useContext } from 'react';
import { SnackbarContext } from '../Snackbar/SnackbarProvider';
import { AdminTicket, UserTicket } from '@prisma/client';
import { downloadExcel } from 'react-export-table-to-excel';
import { formatDate } from '@/utils/date';

export default function TicketsAdminDetails({
	ticket,
	children
}: {
	ticket: AdminTicket & {
		tickets: UserTicket[];
	};
	children: React.ReactNode;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const header = [
		'ID',
		...ticket.labels.map((label) => label.toUpperCase()),
		'PURCHASE MAIL',
		'PURCHASE NAME',
		'PURCHASE PHONE',
		'PURCHASED AT'
	];
	const body = ticket.tickets.map((ticket) => {
		return [
			ticket.slNo,
			...ticket.values,
			ticket.email,
			ticket.name || 'N/A',
			ticket.phone || 'N/A',
			formatDate(ticket.createdAt)
		];
	});
	function exportAsExcel() {
		downloadExcel({
			fileName: 'Customer Details For ' + ticket.type,
			tablePayload: {
				header,
				body
			},
			sheet: 'Ticket Customer Details'
		});
		setSnackbar({
			message: 'Downloaded the excel file',
			type: 'success'
		});
	}
	return (
		<>
			<button
				className="self-end rounded-md bg-accent p-1 px-2 text-skin-inverted"
				onClick={exportAsExcel}
			>
				Export as Excel
			</button>
			{children}
		</>
	);
}
