export interface UserTicket {
	slNo: number;
	id: string;
	name: string | null;
	phone: string | null;
	email: string;
	type: string;
	scanned: boolean;
	price: number;
	eventId: string;
	eventTitle: string;
	eventImage: string | null;
	eventSummary: string | null;
	eventType: string;
	eventCategory: string;
	eventSubCategory: string | null;
	qrcode: string;
	labels: string[];
	values: string[];
}

export interface CustomInput {
	label: string;
	value: string;
	optional: boolean;
}
