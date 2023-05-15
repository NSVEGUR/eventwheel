'use client';
import { useContext, useState } from 'react';
import z from 'zod';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { Event } from '@prisma/client';

const withdrawalSchema = z.object({
	amount: z.coerce.number(),
	transitNumber: z.coerce
		.string()
		.length(5, {
			message: 'Transit number must contain 5 digits'
		})
		.regex(/^\d+$/)
		.transform(Number),
	institutionNumber: z.coerce
		.string()
		.length(3, {
			message: 'Institution number must contain 3 digits'
		})
		.regex(/^\d+$/)
		.transform(Number),
	accountNumber: z.coerce
		.string()
		.length(7, {
			message: 'Account number must contain 7 digits'
		})
		.regex(/^\d+$/)
		.transform(Number)
});

export interface WithdrawalProps {
	amount?: number;
	transitNumber?: number;
	institutionNumber?: number;
	accountNumber?: number;
}

export default function WithdrawalForm({
	event
}: {
	event: Event;
}) {
	const [values, setValues] = useState<WithdrawalProps>({});
	const { setSnackbar } = useContext(SnackbarContext);
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
	const handleSubmit = async function (e: React.FormEvent) {
		e.preventDefault();
		const result = withdrawalSchema.safeParse(values);
		if (!result.success) {
			const { error } = result;
			setSnackbar({
				message: error.message,
				type: 'failure'
			});
			return;
		}
		console.log(result.data, 'successful data');
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
						className="p-3 border-[1px] border-base outline-accent"
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
						className="p-3 border-[1px] border-base outline-accent"
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
						className="p-3 border-[1px] border-base outline-accent"
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
							setValues({});
						}}
					>
						Discard
					</button>
					<input
						className="px-2 py-1 border-[1px] border-accent bg-accent text-skin-inverted rounded-md cursor-pointer"
						type="submit"
						value="Save"
					/>
				</div>
			</footer>
		</form>
	);
}
