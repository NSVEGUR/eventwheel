import Loader from '@/components/Loader';

export default function Loading() {
	return (
		<div className="grid h-screen w-screen place-items-center">
			<Loader></Loader>
		</div>
	);
}
