'use client';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Html2Pdf from 'js-html2pdf';
import { useContext } from 'react';
import { SnackbarContext } from '../Snackbar/SnackbarProvider';
import { AdminTicket, UserTicket } from '@prisma/client';
import Details from './Details';

export default function TicketsAdminDetails({
	ticket
}: {
	ticket: AdminTicket & {
		tickets: UserTicket[];
	};
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const ref = useRef<HTMLDivElement>(null);
	const handlePrint = useReactToPrint({
		onPrintError: (error) => console.log(error),
		content: () => ref.current,
		removeAfterPrint: true,
		print: async (printIframe) => {
			const document = printIframe.contentDocument;
			if (document) {
				const html = document.getElementById(
					'ticket-details'
				);
				console.log(html);
				const exporter = new Html2Pdf(html, {
					filename: `${ticket.type}.pdf`
				});
				await exporter.getPdf(true);
			}
		},
		onAfterPrint: () => {
			setSnackbar({
				message: 'Downloaded the ticket',
				type: 'success'
			});
		}
	});
	return (
		<>
			<button
				className="self-end rounded-md bg-accent p-1 px-2 text-skin-inverted"
				onClick={handlePrint}
			>
				Export as PDF
			</button>
			<Details ref={ref} ticket={ticket} />
		</>
	);
}
