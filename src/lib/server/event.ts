import { createServerClient } from '@/utils/supabase-server';
import { AppError } from './exception';
import prisma from './prisma';
import { AdminTicket, Event } from '@prisma/client';

export interface LikedEvent extends Event {
	liked: boolean | undefined;
	tickets: AdminTicket[];
}

export async function getEvents() {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication required, login to continue',
				401
			);
		}
		const events = await prisma.event.findMany({
			where: {
				userId: user.id
			},
			include: {
				tickets: true
			}
		});
		return events;
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export async function getEvent(id: string) {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication required, login to continue',
				401
			);
		}
		const event = await prisma.event.findUnique({
			where: {
				id
			},
			include: {
				tickets: true
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		if (event.userId != user.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		return event;
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export async function getWithdrawals(id: string) {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication required, login to continue',
				401
			);
		}
		const event = await prisma.event.findUnique({
			where: {
				id
			},
			include: {
				withdrawalRequests: true,
				tickets: true,
				likedUsers: true
			}
		});
		if (!event) {
			throw new AppError('Event not found', 404);
		}
		if (event.userId != user.id) {
			throw new AppError(
				'Authorization error, you have no access',
				403
			);
		}
		const { withdrawalRequests, likedUsers, ...others } =
			event;
		return { withdrawalRequests, others, likedUsers };
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export const getEventsUnAuthenticated = async () => {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		const events = await prisma.event.findMany({
			where: {
				published: true
			},
			include: {
				likedUsers: true,
				tickets: true
			}
		});
		const currentTime = new Date();
		const filteredEvents = events.filter(
			(event) => event.ends > currentTime
		);
		if (!user) {
			return filteredEvents.map(
				({ likedUsers, ...event }) => {
					return {
						...event,
						liked: undefined
					};
				}
			) as LikedEvent[];
		}

		return filteredEvents.map(
			({ likedUsers, ...event }) => {
				const likedIds = likedUsers.map(({ id }) => id);
				return {
					...event,
					liked: likedIds.includes(user.id)
				};
			}
		) as LikedEvent[];
	} catch (err) {
		throw new AppError(
			'Database connection error, please verify and try again 😵‍💫',
			500
		);
	}
};

export async function getEventUnAuthenticated(id: string) {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		const event = await prisma.event.findUnique({
			where: {
				id
			},
			include: {
				likedUsers: true,
				tickets: true
			}
		});
		const currentTime = new Date();
		if (!event || !event.published) {
			throw new AppError('Event not found', 404);
		}
		if (event.ends < currentTime) {
			throw new AppError('Event has ended', 400);
		}
		const { likedUsers, ...others } = event;
		if (!user) {
			return {
				...others,
				liked: undefined
			} as LikedEvent;
		}
		const likedIds = likedUsers.map(({ id }) => id);
		return {
			...others,
			liked: likedIds.includes(user.id)
		} as LikedEvent;
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}

export async function getWishlistEvents() {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication required, login to continue',
				401
			);
		}
		const events = await prisma.event.findMany({
			where: {
				likedUsers: {
					some: {
						id: user.id
					}
				}
			},
			include: {
				likedUsers: true,
				tickets: true
			}
		});
		return events.map(({ likedUsers, ...event }) => {
			const likedIds = likedUsers.map(({ id }) => id);
			return {
				...event,
				liked: likedIds.includes(user.id)
			};
		}) as LikedEvent[];
	} catch (err) {
		console.error(err);
		if (err instanceof AppError) {
			throw new AppError(err.message, err.statusCode);
		} else {
			throw new AppError(
				'Database connection error, please verify and try again 😵‍💫',
				500
			);
		}
	}
}
