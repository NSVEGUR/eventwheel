import BasicCreationForm, {
	type CreationFormEntries
} from '@/components/BasicCreationForm';
import { formatDate } from '@/utils/date';
import { getEvent } from '@/lib/server/event';

export const dynamic = 'force-dynamic';

export default async function Page({
	params
}: {
	params: { eventId: string };
}) {
	const event = await getEvent(params.eventId);
	console.log(event.starts, event.ends);
	const [startDate, startTime] = formatDate(
		event.starts
	).split(' ');
	const [endDate, endTime] = formatDate(event.ends).split(
		' '
	);
	console.log(startDate, startTime, endDate, endTime);
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
