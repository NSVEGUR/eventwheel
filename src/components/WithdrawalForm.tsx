'use client';
import { useContext, useState } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { AdminTicket, Event } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { getTicketsDetails } from '@/utils/tickets';

export interface WithdrawalProps {
	amount: number;
	transitNumber: number;
	institutionNumber: number;
	accountNumber: number;
}

const DEFAULT_PROPS: WithdrawalProps = {
	amount: 0,
	transitNumber: 0,
	institutionNumber: 0,
	accountNumber: 0
};

export default function WithdrawalForm({
	event
}: {
	event: Event & {
		tickets: AdminTicket[];
	};
}) {
	const [values, setValues] =
		useState<WithdrawalProps>(DEFAULT_PROPS);
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		const name = e.target.name;
		if (
			name === 'transitNumber' &&
			e.target.value.length < 6
		) {
			setValues({
				...values,
				[e.target.name]: e.target.value
			});
			return;
		}
		if (
			name === 'institutionNumber' &&
			e.target.value.length < 4
		) {
			setValues({
				...values,
				[e.target.name]: e.target.value
			});
			return;
		}
		if (
			name === 'accountNumber' &&
			e.target.value.length < 8
		) {
			setValues({
				...values,
				[e.target.name]: e.target.value
			});
			return;
		}
		if (name === 'amount') {
			setValues({
				...values,
				[e.target.name]: e.target.value
			});
		}
	};
	const handleSubmit = async function (e: React.FormEvent) {
		e.preventDefault();
		if (values.amount < 0.5) {
			return setSnackbar({
				message: 'Amount must be at least 0.5$',
				type: 'failure'
			});
		}
		if (values.transitNumber.toString().length !== 5) {
			return setSnackbar({
				message: 'Transit Number must contain 5 digits',
				type: 'failure'
			});
		}
		if (values.institutionNumber.toString().length !== 3) {
			return setSnackbar({
				message: 'Institution Number must contain 3 digits',
				type: 'failure'
			});
		}
		if (values.accountNumber.toString().length !== 7) {
			return setSnackbar({
				message: 'Account Number must contain 7 digits',
				type: 'failure'
			});
		}
		const { gross } = getTicketsDetails(event.tickets);
		if (values.amount > gross) {
			return setSnackbar({
				message: `Can't make a withdrawal request greater than gross ${gross}$`,
				type: 'failure'
			});
		}
		const data = {
			amount: parseFloat(
				parseFloat(values.amount.toString()).toFixed(4)
			),
			transitNumber: parseInt(
				values.transitNumber.toString()
			),
			institutionNumber: parseInt(
				values.institutionNumber.toString()
			),
			accountNumber: parseInt(
				values.accountNumber.toString()
			)
		};
		setSnackbar({
			message: 'Creating withdrawal request...',
			type: 'promise'
		});
		const response = await fetch(
			`/api/event/manage/${event.id}/withdraw`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		if (response.status >= 200 && response.status < 400) {
			setSnackbar({
				message:
					'Please allow us 1 business day to process your amount',
				type: 'success'
			});
			return router.push(response.url);
		}
		if (response.status === 401) {
			const result = await response.json();
			setSnackbar({
				message:
					result.message ??
					'Something went wrong 💥, login again to continue',
				type: 'failure'
			});
			router.push(result.url);
			return setValues(DEFAULT_PROPS);
		}
		setSnackbar({
			message:
				'Something went wrong 💥, login again to continue',
			type: 'failure'
		});
		return setValues(DEFAULT_PROPS);
	};
	return (
		<form
			className="relative mt-5 h-screen w-[1000px] overflow-scroll"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col justify-center gap-10 px-32 py-10 -md:p-2">
				<div className="relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="absolute -left-10 top-0 h-8 w-8 text-skin-muted"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
					<h1 className="text-3xl font-bold">
						Withdrawal Form
					</h1>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="amount">
						Amount{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="number"
						name="amount"
						step="0.01"
						required
						value={values.amount}
						onChange={handleChange}
						className="border-[1px] border-base p-3 outline-accent"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="transitNumber">
						Transit Number{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="number"
						name="transitNumber"
						step="1"
						required
						maxLength={5}
						value={values.transitNumber}
						onChange={handleChange}
						className="border-[1px] border-base p-3 outline-accent"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="institutionNumber">
						Institution Number{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="number"
						name="institutionNumber"
						step="1"
						required
						maxLength={3}
						value={values.institutionNumber}
						onChange={handleChange}
						className="border-[1px] border-base p-3 outline-accent"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="accountNumber">
						Account Number{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="number"
						name="accountNumber"
						step="1"
						required
						maxLength={7}
						value={values.accountNumber}
						onChange={handleChange}
						className="border-[1px] border-base p-3 outline-accent"
					/>
				</div>
			</div>
			<footer className="fixed bottom-0 left-0 right-0 h-16 border-t-[1px] bg-dominant">
				<div className="flex h-full w-full items-center justify-end gap-5 pr-10">
					<button
						className="rounded-md border-[1px] border-accent px-2 py-1"
						onClick={(e) => {
							e.preventDefault();
							setValues(DEFAULT_PROPS);
						}}
					>
						Discard
					</button>
					<input
						className="cursor-pointer rounded-md border-[1px] border-accent bg-accent px-2 py-1 text-skin-inverted"
						type="submit"
						value="Save"
					/>
				</div>
			</footer>
		</form>
	);
}
