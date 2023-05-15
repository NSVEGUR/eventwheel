'use client';

import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import AuthInput from '@/components/AuthInput';
import { useRouter } from 'next/navigation';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import { useAuth } from '@/components/providers/supabase-auth-provider';

export default function Page() {
	const [values, setValues] = useState({
		email: '',
		password: ''
	});
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	const { signInWithCredentials, user } = useAuth();
	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);
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
			message: 'Logging In',
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
		return router.push('/');
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
		<div className="flex w-[450px] flex-col bg-white bg-opacity-80 shadow-md rounded-xl gap-5 items-center justify-center p-10">
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
				className="w-full bg-accent text-skin-inverted rounded-lg p-2"
			>
				Login
			</button>
			<div className="flex w-full items-center justify-center">
				<div className="h-[1px] w-full bg-muted-complementary flex-grow"></div>
				<span className="px-3 border-[1px] border-complementary rounded-xl">
					or
				</span>
				<div className="h-[1px] w-full bg-muted-complementary flex-grow"></div>
			</div>
			<button
				type="submit"
				className="w-full border-[1px] border-inverted rounded-lg p-2"
			>
				Continue with Google
			</button>
			<h1 className=" text-skin-complementary">
				No Account?{' '}
				<Link
					href="/signup"
					className="underline text-accent"
				>
					SignUp Here
				</Link>
			</h1>
		</div>
	);
}
