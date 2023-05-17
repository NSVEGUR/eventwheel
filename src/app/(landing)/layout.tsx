import Header from '@/components/LandingHeader';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mt-16 overflow-x-hidden">
			<Header />
			{children}
		</div>
	);
}
