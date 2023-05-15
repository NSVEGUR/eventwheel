import TicketForm, {
	DEFAULT_TICKET_FORM_ENTRIES
} from '@/components/TicketForm';

export default function Page({
	params
}: {
	params: { eventId: string };
}) {
	return (
		<TicketForm
			{...{
				eventId: params.eventId,
				method: 'POST',
				ticket: DEFAULT_TICKET_FORM_ENTRIES
			}}
		></TicketForm>
	);
}
