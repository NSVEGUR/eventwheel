import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

const middleware = async (req: NextRequest) => {
	console.log('running middleware');
	const res = NextResponse.next();
	const supabase = createMiddlewareSupabaseClient<Database>(
		{ req, res }
	);
	const {
		data: { session }
	} = await supabase.auth.getSession();
	if (!session) {
		const { pathname } = req.nextUrl;
		const url = new URL('/signin', req.url);
		if (req.method === 'GET' && !pathname.includes('api')) {
			url.searchParams.set('from', pathname);
			return NextResponse.redirect(url);
		}
		return NextResponse.json(
			{
				success: false,
				message: 'Authentication failed, login to continue',
				url: url.href
			},
			{ status: 401 }
		);
	}
	return res;
};

export default middleware;

export const config = {
	matcher: [
		'/manage/:path*',
		'/tickets/:path*',
		'/wishlist/:path*',
		'/api/event/manage/:path*'
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
