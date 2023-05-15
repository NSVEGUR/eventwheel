import 'server-only';
import './globals.css';
import { Inter } from 'next/font/google';
import SnackbarProvider from '@/components/Snackbar/SnackbarProvider';
import SupabaseProvider from '@/components/providers/supabase-provider';
import SupabaseAuthProvider from '@/components/providers/supabase-auth-provider';
import { createServerClient } from '@/utils/supabase-server';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Eventmate',
	description: 'Event tickets management app'
};

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
		<html lang="en">
			<body className={inter.className}>
				<SupabaseProvider>
					<SupabaseAuthProvider serverSession={session}>
						<SnackbarProvider>{children}</SnackbarProvider>
					</SupabaseAuthProvider>
				</SupabaseProvider>
			</body>
		</html>
	);
}
