import Nav from '@/components/ManageNav';

export default function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<Nav>
			<div>{children}</div>
		</Nav>
	);
}
