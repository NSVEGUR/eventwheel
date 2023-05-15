import 'server-only';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import type { Database } from '@/types/supabase';

export const createServerClient = () =>
	createServerComponentSupabaseClient<Database>({
		cookies,
		headers
	});
