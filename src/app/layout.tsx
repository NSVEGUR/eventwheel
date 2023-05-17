import 'server-only';
import './globals.css';
import { Inter } from 'next/font/google';
import SnackbarProvider from '@/components/Snackbar/SnackbarProvider';
import SupabaseProvider from '@/components/providers/supabase-provider';
import SupabaseAuthProvider from '@/components/providers/supabase-auth-provider';
import { createServerClient } from '@/utils/supabase-server';
import Script from 'next/script';

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
				<SnackbarProvider>
					<SupabaseProvider>
						<SupabaseAuthProvider serverSession={session}>
							{children}
							<Script
								src="https://kit.fontawesome.com/549aab17e5.js"
								crossOrigin="anonymous"
							></Script>
						</SupabaseAuthProvider>
					</SupabaseProvider>
				</SnackbarProvider>
			</body>
		</html>
	);
}
