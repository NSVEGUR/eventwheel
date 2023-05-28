'use client';

import { useState, useContext, useEffect } from 'react';
import AuthInput from '@/components/AuthInput';
import { useRouter } from 'next/navigation';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import z from 'zod';
import { useSupabase } from '@/components/providers/supabase-provider';

const userSchema = z.object({
	password: z
		.string()
		.regex(
			new RegExp(
				'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
			)
		)
});

export default function Page() {
	const [values, setValues] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});
	const { setSnackbar } = useContext(SnackbarContext);
	const { supabase } = useSupabase();
	const router = useRouter();
	const inputDetails = [
		{
			id: 2,
			type: 'password',
			name: 'password',
			label: 'Password',
			required: true,
			errorMessage:
				'Password should be at least 8 characters and include a letter, a number and a special character',
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
		},
		{
			id: 3,
			type: 'password',
			name: 'confirmPassword',
			label: 'Confirm Password',
			required: true,
			errorMessage: "Passwords don't match",
			pattern: values.password
		}
	];
	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (
					event !== 'PASSWORD_RECOVERY' &&
					event !== 'INITIAL_SESSION' &&
					event !== 'SIGNED_IN'
				) {
					setSnackbar({
						message:
							'Password recovery session has been timed out',
						type: 'failure'
					});
					return router.push('/');
				}
			}
		);
		return () => {
			subscription.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, supabase]);
	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		if (values.password != values.confirmPassword) {
			return setSnackbar({
				message: "Passwords Don't Match",
				type: 'failure'
			});
		}
		const { success } = userSchema.safeParse({
			email: values.email,
			password: values.password
		});
		if (!success) {
			return setSnackbar({
				message: 'Invalid Form, Please check again',
				type: 'failure'
			});
		}
		setSnackbar({
			message: 'Signing Up...',
			type: 'promise'
		});
		const { data, error } = await supabase.auth.updateUser({
			password: values.password
		});
		if (error) {
			return setSnackbar({
				message: error.message,
				type: 'failure'
			});
		}
		setSnackbar({
			message: 'Password changed successfully...',
			type: 'success'
		});
		return router.push('/signin');
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	return (
		<div className="flex w-[450px] flex-col items-center justify-center gap-5 rounded-xl bg-white bg-opacity-80 p-10 shadow-md">
			{inputDetails.map((inputDetail) => {
				return (
					<AuthInput
						{...inputDetail}
						key={inputDetail.id}
						onChange={handleChange}
					/>
				);
			})}
			<button
				type="submit"
				onClick={handleSubmit}
				className="w-full rounded-lg bg-accent p-2 text-skin-inverted"
			>
				Update Password
			</button>
		</div>
	);
}
