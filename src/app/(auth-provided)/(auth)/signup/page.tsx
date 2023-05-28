'use client';

import Link from 'next/link';
import { useState, useContext } from 'react';
import AuthInput from '@/components/AuthInput';
import { useRouter } from 'next/navigation';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import z from 'zod';
import { useSupabase } from '@/components/providers/supabase-provider';

const userSchema = z.object({
	email: z.coerce.string().email().min(5),
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
			id: 1,
			type: 'email',
			name: 'email',
			label: 'Email',
			required: true,
			errorMessage: 'It should be a valid email address'
		},
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
		const { data, error } = await supabase.auth.signUp({
			email: values.email,
			password: values.password
		});
		if (error) {
			if (
				error.status &&
				error.status >= 400 &&
				error.status < 500
			) {
				return setSnackbar({
					message: 'Invalid Credentials',
					type: 'failure'
				});
			}
			return setSnackbar({
				message:
					'Something went wrong on the server, please try again later',
				type: 'failure'
			});
		}
		setSnackbar({
			message:
				'Please check your mail and confirm to continue...',
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
				Signup
			</button>
			<div className="flex w-full items-center justify-center">
				<div className="h-[1px] w-full flex-grow bg-muted-complementary"></div>
				<span className="rounded-xl border-[1px] border-complementary px-3">
					or
				</span>
				<div className="h-[1px] w-full flex-grow bg-muted-complementary"></div>
			</div>
			<button
				type="submit"
				className="w-full rounded-lg border-[1px] border-inverted p-2"
			>
				Continue with Google
			</button>
			<h1 className=" text-skin-complementary">
				Have Account?{' '}
				<Link
					href="/signin"
					className="text-accent underline"
				>
					SignIn Here
				</Link>
			</h1>
		</div>
	);
}
