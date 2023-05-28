'use client';

import { useContext, useState } from 'react';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import AuthInput from '@/components/AuthInput';
import { useSupabase } from '@/components/providers/supabase-provider';
import z from 'zod';

const userSchema = z.object({
	email: z.coerce.string().email().min(5)
});

export default function Page() {
	const { setSnackbar } = useContext(SnackbarContext);
	const [email, setEmail] = useState('');
	const { supabase } = useSupabase();
	const inputDetail = {
		id: 1,
		type: 'email',
		name: 'email',
		label: 'Email',
		required: true,
		errorMessage: 'It should be a valid email address'
	};
	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		const { success } = userSchema.safeParse({
			email
		});
		if (!success) {
			return setSnackbar({
				message: 'Invalid Email',
				type: 'failure'
			});
		}
		setSnackbar({
			message: 'Sending the recovery email password...',
			type: 'promise'
		});
		const { error } =
			await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: 'http://localhost:3000/forgot'
			});
		if (error) {
			return setSnackbar({
				message:
					'Failed to send recovery email, please refresh and try again',
				type: 'failure'
			});
		}
		return setSnackbar({
			message: 'Recovery email sent',
			type: 'success'
		});
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setEmail(e.target.value);
	};
	return (
		<div className="flex w-[450px] flex-col items-center justify-center gap-5 rounded-xl bg-white bg-opacity-80 p-10 shadow-md">
			<AuthInput
				{...inputDetail}
				key={inputDetail.id}
				onChange={handleChange}
			/>
			<button
				type="submit"
				onClick={handleSubmit}
				className="w-full rounded-lg bg-accent p-2 text-skin-inverted"
			>
				Recover Password
			</button>
		</div>
	);
}
