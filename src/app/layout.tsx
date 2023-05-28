import 'server-only';
import './globals.css';
import { Inter } from 'next/font/google';
import SnackbarProvider from '@/components/Snackbar/SnackbarProvider';
import SupabaseProvider from '@/components/providers/supabase-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'eventwheel',
	description: 'Event tickets management app'
};

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SnackbarProvider>
					<SupabaseProvider>{children}</SupabaseProvider>
				</SnackbarProvider>
			</body>
		</html>
	);
}
