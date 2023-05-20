'use client';

import Link from 'next/link';
import { useState, useContext } from 'react';
import AuthInput from '@/components/AuthInput';
import { useRouter } from 'next/navigation';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import { useAuth } from '@/components/providers/supabase-auth-provider';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const [values, setValues] = useState({
		email: '',
		password: ''
	});
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const params = useSearchParams();
	const fromPath = params.get('from');
	const { signInWithCredentials, user } = useAuth();
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
		}
	];
	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		setSnackbar({
			message: 'Logging In...',
			type: 'promise'
		});
		const error = await signInWithCredentials(
			values.email,
			values.password
		);
		if (error) {
			return setSnackbar({
				message: 'Invalid Credentials',
				type: 'failure'
			});
		}
		setSnackbar({
			message: 'Logged in successfully',
			type: 'success'
		});
		return router.push(fromPath ?? '/');
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
				Login
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
				No Account?{' '}
				<Link
					href="/signup"
					className="text-accent underline"
				>
					SignUp Here
				</Link>
			</h1>
		</div>
	);
}
