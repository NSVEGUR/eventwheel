'use client';
import { baseURL } from '@/lib/constants';

export default function ShareMenuManage({
	eventId
}: {
	eventId: string;
}) {
	return (
		<>
			<div className="flex flex-col gap-2">
				<h1 className="font-medium">Event URL</h1>
				<div className="flex gap-5">
					<h2>{baseURL + eventId}</h2>
					<button>
						<i className="far fa-copy text-complementary"></i>
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h1 className="font-medium">Share On</h1>
				<div className="flex gap-3 text-accent">
					<div>
						<i className="fab fa-facebook-f"></i>
					</div>
					<div>
						<i className="fab fa-twitter"></i>
					</div>
					<div>
						<i className="fas fa-envelope"></i>
					</div>
					<div>
						<i className="fab fa-linkedin-in"></i>
					</div>
					<div>
						<i className="fab fa-whatsapp"></i>
					</div>
				</div>
			</div>
		</>
	);
}
