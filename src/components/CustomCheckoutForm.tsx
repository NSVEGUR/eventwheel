'use client';
import { useState, useContext } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { CustomInput } from '@/types/ticket';
import { useRouter } from 'next/navigation';

export default function CustomCheckoutForm(params: {
	id: string;
	type: string;
	description: string;
	price: number;
	labels: string[];
	optionals: boolean[];
	eventId: string;
	eventTitle: string;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const [values, setValues] = useState<CustomInput[]>(
		params.labels.map((label, i) => ({
			label,
			value: '',
			optional: params.optionals[i]
		}))
	);
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		for (const { value, optional, label } of values) {
			if (!optional && !value) {
				setSnackbar({
					message: `Please fill in the ${label} field`,
					type: 'failure'
				});
				return;
			}
		}
		const data = values;
		try {
			setSnackbar({
				message: 'Redirecting to the payment page...',
				type: 'promise'
			});
			const response = await fetch(
				`/api/event/${params.eventId}/checkout/${params.id}`,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			);
			if (response.status >= 200 && response.status < 400) {
				setSnackbar({
					message: 'Checking out...',
					type: 'success'
				});
				const result = await response.json();
				return router.push(result.url);
			}
			setSnackbar({
				message:
					'Something went wrong 💥, please try again',
				type: 'failure'
			});
			return;
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex min-w-[500px] flex-col items-center gap-3"
		>
			{values.map((value, i) => (
				<div key={i} className="flex w-full flex-col gap-1">
					<label htmlFor={value.label}>
						{value.label}{' '}
						{!value.optional && (
							<span className="text-complementary">*</span>
						)}
					</label>
					<input
						type="text"
						required={!value.optional}
						name={value.label}
						className="w-full border-[1px] border-base p-3 outline-accent"
						value={value.value}
						onChange={(e) => {
							values[i].value = e.target.value;
							setValues([...values]);
						}}
					/>
				</div>
			))}
			<input
				type="submit"
				value="Proceed to Checkout"
				className="mt-5 rounded-md bg-accent p-2 text-skin-inverted"
			/>
		</form>
	);
}
