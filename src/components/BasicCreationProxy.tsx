'use client';
import { Event, AdminTicket } from '@prisma/client';
import BasicCreationForm, {
	type CreationFormEntries
} from '@/components/BasicCreationForm';
import { formatDate } from '@/utils/date';

export default function BasicCreationProxy({
	event
}: {
	event: Event & {
		tickets: AdminTicket[];
	};
}) {
	const [startDate, startTime] = formatDate(
		event.starts
	).split(' ');
	const [endDate, endTime] = formatDate(event.ends).split(
		' '
	);
	const init: CreationFormEntries = {
		title: event.title,
		organizer: event.organizer,
		type: event.type,
		category: event.category,
		startDate,
		startTime,
		endDate,
		endTime,
		location: event.location,
		displayStart: event.displayStart,
		displayEnd: event.displayEnd
	};
	return (
		<BasicCreationForm
			{...{
				event: init,
				method: 'PATCH',
				eventId: event.id
			}}
		/>
	);
}
