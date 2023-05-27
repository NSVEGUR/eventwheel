'use client';
import QrReader from 'react-qr-reader';
import { useContext, useState } from 'react';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import { UserTicket } from '@/types/ticket';
import Ticket from '@/components/Ticket';

export default function QR({
	tickets
}: {
	tickets: UserTicket[];
}) {
	const [camera, setCamera] = useState<
		'environment' | 'user'
	>('environment');
	const { setSnackbar } = useContext(SnackbarContext);
	const [ticket, setTicket] = useState<
		undefined | UserTicket
	>();
	const [scan, setScan] = useState(false);
	const handleResult = (result: string | null) => {
		if (result) {
			setScan(false);
			const ids = tickets.map((ticket) => ticket.id);
			if (!ids.includes(result)) {
				setSnackbar({
					message: 'Invalid ticket',
					type: 'failure'
				});
				return;
			}
			const ticket = tickets.filter(
				(ticket) => ticket.id === result
			)[0];
			setTicket(ticket);
			setSnackbar({
				message: 'verified successfully',
				type: 'success'
			});
		}
	};
	return (
		<div className="flex flex-col items-center gap-10 p-10">
			<h1 className="text-center text-xl font-medium">
				QR Scanner
			</h1>
			{!scan && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-10 w-10"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			)}
			{scan ? (
				<>
					<select
						onChange={(e) => {
							if (e.target.value === 'environment')
								setCamera('environment');
							if (e.target.value === 'user')
								setCamera('user');
						}}
					>
						<option value={'environment'}>
							Back Camera
						</option>
						<option value={'user'}>Front Camera</option>
					</select>
					<div className="relative h-[300px] w-[300px]">
						<QrReader
							key={camera}
							onScan={handleResult}
							facingMode={camera}
							delay={1000}
							className="absolute inset-0 h-full w-full"
							onError={(err) => {
								console.error(err);
							}}
						/>
					</div>
					<button
						className="rounded-md bg-accent p-2 text-skin-inverted"
						onClick={() => {
							setScan(false);
						}}
					>
						Cancel Scanning
					</button>
				</>
			) : (
				<button
					className="rounded-md bg-accent p-2 text-skin-inverted"
					onClick={() => {
						setTicket(undefined);
						setScan(true);
					}}
				>
					Scan New Ticket
				</button>
			)}
			{ticket && <Ticket {...{ ticket, printer: false }} />}
		</div>
	);
}
