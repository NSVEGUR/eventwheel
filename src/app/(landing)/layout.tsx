import Header from '@/components/LandingHeader';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="overflow-x-hidden mt-16">
			<Header />
			{children}
		</div>
	);
}
