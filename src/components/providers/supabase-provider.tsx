'use client';

import { createClient } from '@/utils/supabase-browser';
import { useContext, useState, createContext } from 'react';
import type { Database } from '@/types/supabase';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

type SupabaseContext = {
	supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(
	undefined
);

export default function SupabaseProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [supabase] = useState(() => createClient());
	return (
		<Context.Provider value={{ supabase }}>
			{children}
		</Context.Provider>
	);
}

export const useSupabase = () => {
	let context = useContext(Context);
	if (context === undefined) {
		throw new Error(
			'useSupabase must be used inside supabase provider'
		);
	} else {
		return context;
	}
};
