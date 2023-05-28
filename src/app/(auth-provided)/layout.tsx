import 'server-only';
import SupabaseAuthProvider from '@/components/providers/supabase-auth-provider';
import { createServerClient } from '@/utils/supabase-server';

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const supabase = createServerClient();
	const {
		data: { session }
	} = await supabase.auth.getSession();
	return (
		<SupabaseAuthProvider serverSession={session}>
			{children}
		</SupabaseAuthProvider>
	);
}
