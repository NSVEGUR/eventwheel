'use client';
import TicketPrinter from './TicketPrinter';
import { UserTicket } from '@/types/ticket';
import { useRef } from 'react';
import Ticket from './Ticket';
import { useReactToPrint } from 'react-to-print';
import Html2Pdf from 'js-html2pdf';
import { useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';

export default function TicketView({
	ticket,
	printer
}: {
	ticket: UserTicket;
	printer: boolean;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const ticketRef = useRef<HTMLDivElement>(null);
	const handlePrint = useReactToPrint({
		onPrintError: (error) => console.log(error),
		content: () => ticketRef.current,
		removeAfterPrint: true,
		print: async (printIframe) => {
			const document = printIframe.contentDocument;
			if (document) {
				const html = document.getElementById('ticket');
				console.log(html);
				const exporter = new Html2Pdf(html, {
					filename: 'ticket.pdf'
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
			{printer && <TicketPrinter print={handlePrint} />}
			<Ticket ref={ticketRef} ticket={ticket} />
		</>
	);
}
