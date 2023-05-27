export interface UserTicket {
	id: string;
	name: string | null;
	phone: string | null;
	email: string;
	type: string;
	price: number;
	eventId: string;
	eventTitle: string;
	eventImage: string | null;
	eventSummary: string | null;
	eventType: string;
	eventCategory: string;
	eventSubCategory: string | null;
	qrcode: string;
}
