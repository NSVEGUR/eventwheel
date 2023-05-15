import { NextMiddleware, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';

export function stack(
	functions: MiddlewareFactory[] = [],
	index = 0
): NextMiddleware {
	if (index < functions.length) {
		const current = functions[index];
		const next = stack(functions, index + 1);
		return current(next);
	}
	return () => NextResponse.next();
}
