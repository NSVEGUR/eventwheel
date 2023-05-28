import Header from '@/components/LandingHeader';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<div className="m-0 h-[calc(100vh-theme(spacing.16))] w-screen overflow-x-hidden overflow-y-scroll scroll-smooth">
				{children}
			</div>
		</>
	);
}
