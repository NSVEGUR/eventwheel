'use client';

import { User } from '@supabase/supabase-js';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import {
	createContext,
	useContext,
	useEffect
} from 'react';
import useSwr from 'swr';

import { useSupabase } from './supabase-provider';

interface Context {
	user: User | null | undefined;
	error: any;
	isLoading: boolean;
	mutate: any;
	signOut: () => Promise<void>;
	signInWithCredentials: (
		email: string,
		password: string
	) => Promise<string | null>;
}

const Context = createContext<Context>({
	user: null,
	error: null,
	isLoading: true,
	mutate: null,
	signOut: async () => {},
	signInWithCredentials: async (
		email: string,
		password: string
	) => null
});

export default function SupabaseAuthProvider({
	serverSession,
	children
}: {
	serverSession?: Session | null;
	children: React.ReactNode;
}) {
	const { supabase } = useSupabase();
	const router = useRouter();

	//Getting user
	const getUser = async () => {
		const { data: user, error } =
			await supabase.auth.getUser();
		if (error) {
			console.error(error);
			return null;
		} else {
			return user;
		}
	};
	const {
		data: user,
		error,
		isLoading,
		mutate
	} = useSwr(
		serverSession ? 'users-context' : null,
		getUser
	);

	const signOut = async () => {
		await supabase.auth.signOut();
		router.push('/signin');
	};

	const signInWithCredentials = async (
		email: string,
		password: string
	) => {
		const { error } =
			await supabase.auth.signInWithPassword({
				email,
				password
			});
		if (error) {
			return error.message;
		}
		return null;
	};

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (
					session?.access_token !=
					serverSession?.access_token
				) {
					router.refresh();
				}
			}
		);
		return () => {
			subscription.unsubscribe();
		};
	}, [router, supabase, serverSession?.access_token]);
	const exposed: Context = {
		user: user?.user,
		error,
		isLoading,
		mutate,
		signOut,
		signInWithCredentials
	};

	return (
		<Context.Provider value={exposed}>
			{children}
		</Context.Provider>
	);
}

export const useAuth = () => {
	let context = useContext(Context);
	if (context === undefined) {
		throw new Error(
			'useAuth must be used inside SupabaseAuthProvider'
		);
	} else {
		return context;
	}
};
