'use client';

import { useContext, useState } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';

export interface TicketForm {
	type: string;
	description: string | null;
	price: number;
	available: number;
	id: string;
}

export const DEFAULT_TICKET_FORM_ENTRIES: TicketForm = {
	type: '',
	description: '',
	price: 0,
	id: '',
	available: 100
};

export default function TicketForm({
	ticket,
	eventId,
	method
}: {
	ticket: TicketForm;
	eventId: string;
	method: 'POST' | 'PATCH';
}) {
	const [values, setValues] = useState<TicketForm>(ticket);
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSnackbar({
			message:
				method === 'POST'
					? 'Creating Ticket...'
					: 'Updating Ticket...',
			type: 'promise'
		});
		let data;
		if (method === 'POST') {
			data = {
				eventId: eventId,
				type: values.type,
				description: values.description,
				price: parseFloat(
					parseFloat(values.price.toString()).toFixed(4)
				),
				available: values.available
			};
		} else {
			data = {
				ticketId: ticket.id,
				eventId: eventId,
				type: values.type,
				description: values.description,
				price: parseFloat(
					parseFloat(values.price.toString()).toFixed(4)
				),
				available: values.available
			};
		}
		try {
			const response = await fetch(
				`/api/event/${eventId}/tickets`,
				{
					method: method,
					body: JSON.stringify(data),
					headers: { 'content-Type': 'application/json' }
				}
			);
			if (response.status >= 200 && response.status < 300) {
				setSnackbar({
					message:
						method === 'POST'
							? 'Created Successfully'
							: 'Updated Successfully',
					type: 'success'
				});
				return router.push(response.url);
			}
			setSnackbar({
				message: response.statusText,
				type: 'failure'
			});
			return setValues(ticket);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form
			className="relative mt-5 w-[1000px] overflow-scroll h-screen"
			onSubmit={handleSubmit}
		>
			<div className="py-10 px-32 flex flex-col gap-10 justify-center -md:p-2">
				<div className="relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 absolute top-0 -left-10 text-skin-muted"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
						/>
					</svg>
					<h1 className="text-3xl font-bold">
						Ticket{' '}
						{method === 'POST' ? 'Creation' : 'Updation'}{' '}
						Form
					</h1>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="type">
						Type{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="text"
						name="type"
						required
						value={values.type}
						onChange={handleChange}
						className="p-3 border-[1px] border-base outline-accent"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="description">
						Description{' '}
						<span className="text-complementary">*</span>
					</label>
					<textarea
						name="description"
						minLength={10}
						rows={3}
						required
						value={values.description ?? ''}
						onChange={handleChange}
						className="p-3 border-[1px] border-base outline-accent"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="price">
						Price{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="number"
						name="price"
						step={0.01}
						required
						value={values.price}
						onChange={handleChange}
						className="p-3 border-[1px] border-base outline-accent"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="available">
						Available{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="number"
						name="available"
						step={1}
						required
						value={values.available}
						onChange={handleChange}
						className="p-3 border-[1px] border-base outline-accent"
					/>
				</div>
			</div>
			<footer className="fixed right-0 bottom-0 left-0 h-16 bg-dominant border-t-[1px]">
				<div className="flex w-full h-full justify-end items-center gap-5 pr-10">
					<button
						className="px-2 py-1 border-[1px] border-accent rounded-md"
						onClick={(e) => {
							e.preventDefault();
							setValues(ticket);
						}}
					>
						Discard
					</button>
					<input
						className="px-2 py-1 border-[1px] border-accent bg-accent text-skin-inverted rounded-md cursor-pointer"
						type="submit"
						value={method === 'POST' ? 'Save' : 'Update'}
					/>
				</div>
			</footer>
		</form>
	);
}
