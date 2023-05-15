import Nav from '@/components/EventNav';

export default function Layout({
	params,
	children
}: {
	params: {
		eventId: string;
	};
	children: React.ReactNode;
}) {
	return <Nav {...{ id: params.eventId }}>{children}</Nav>;
}
