export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			_prisma_migrations: {
				Row: {
					applied_steps_count: number;
					checksum: string;
					finished_at: string | null;
					id: string;
					logs: string | null;
					migration_name: string;
					rolled_back_at: string | null;
					started_at: string;
				};
				Insert: {
					applied_steps_count?: number;
					checksum: string;
					finished_at?: string | null;
					id: string;
					logs?: string | null;
					migration_name: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Update: {
					applied_steps_count?: number;
					checksum?: string;
					finished_at?: string | null;
					id?: string;
					logs?: string | null;
					migration_name?: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
			};
			admin_tickets: {
				Row: {
					description: string | null;
					eventId: string;
					id: string;
					price: number;
					type: string;
				};
				Insert: {
					description?: string | null;
					eventId: string;
					id: string;
					price: number;
					type: string;
				};
				Update: {
					description?: string | null;
					eventId?: string;
					id?: string;
					price?: number;
					type?: string;
				};
			};
			events: {
				Row: {
					category: string;
					description: string | null;
					displayEnd: boolean;
					displayStart: boolean;
					ends: string;
					id: string;
					image: string | null;
					likes: number;
					location: string;
					organizer: string;
					published: boolean;
					recurrence: string | null;
					starts: string;
					subCategory: string | null;
					summary: string | null;
					title: string;
					type: string;
					userId: string;
					views: number;
				};
				Insert: {
					category: string;
					description?: string | null;
					displayEnd?: boolean;
					displayStart?: boolean;
					ends: string;
					id: string;
					image?: string | null;
					likes?: number;
					location: string;
					organizer: string;
					published?: boolean;
					recurrence?: string | null;
					starts: string;
					subCategory?: string | null;
					summary?: string | null;
					title: string;
					type: string;
					userId: string;
					views?: number;
				};
				Update: {
					category?: string;
					description?: string | null;
					displayEnd?: boolean;
					displayStart?: boolean;
					ends?: string;
					id?: string;
					image?: string | null;
					likes?: number;
					location?: string;
					organizer?: string;
					published?: boolean;
					recurrence?: string | null;
					starts?: string;
					subCategory?: string | null;
					summary?: string | null;
					title?: string;
					type?: string;
					userId?: string;
					views?: number;
				};
			};
			faqs: {
				Row: {
					answer: string;
					eventId: string;
					id: number;
					question: string;
				};
				Insert: {
					answer: string;
					eventId: string;
					id?: number;
					question: string;
				};
				Update: {
					answer?: string;
					eventId?: string;
					id?: number;
					question?: string;
				};
			};
			user_tickets: {
				Row: {
					id: string;
					ticketId: string;
					userId: string;
				};
				Insert: {
					id: string;
					ticketId: string;
					userId: string;
				};
				Update: {
					id?: string;
					ticketId?: string;
					userId?: string;
				};
			};
			users: {
				Row: {
					email: string;
					id: string;
					name: string | null;
				};
				Insert: {
					email: string;
					id: string;
					name?: string | null;
				};
				Update: {
					email?: string;
					id?: string;
					name?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
