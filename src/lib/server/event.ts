import { createServerClient } from '@/utils/supabase-server';
import { AppError } from './exception';
import prisma from './prisma';

export async function getEvents() {
	try {
		const supabase = createServerClient();
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw new AppError(
				'Authentication failed, login to continue',
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
				'Authentication failed, login to continue',
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
