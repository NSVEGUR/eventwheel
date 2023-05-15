import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

import { AppError } from '@/lib/server/exception';
import { catchAsync } from '@/lib/server/catchAsync';

const middleware = catchAsync(async (req: NextRequest) => {
	const res = NextResponse.next();
	const supabase = createMiddlewareSupabaseClient<Database>(
		{ req, res }
	);
	const {
		data: { session }
	} = await supabase.auth.getSession();
	if (!session) {
		const url = new URL(req.url);
		url.pathname = '/signin';
		return NextResponse.redirect(url);
	}
	return res;
});

export default middleware;

export const config = {
	matcher: [
		'/manage/:path*',
		'/tickets/:path*',
		'/likes/:path*',
		'/api/event/:path*'
	]
};

// const sampleMiddleware = async () => {
// 	const res = NextResponse.next();
// 	return res;
// };

// const middlewares = [AuthMiddleware, sampleMiddleware];

// export default stack(middlewares)

// export default AuthMiddleware(sampleMiddleware);
// export default sampleMiddleware;
