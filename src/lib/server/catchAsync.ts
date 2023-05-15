import { NextRequest, NextResponse } from 'next/server';

const errorDev = (err: any) => {
	console.error('ERROR! 💥💥💥', err);
	return NextResponse.json(
		{
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack
		},
		{
			status: err.statusCode,
			statusText:
				err.message instanceof String
					? err.message
					: 'Something went wrong, server side error 😵‍💫'
		}
	);
};

const errorProd = (err: any) => {
	console.error('ERROR! 💥💥💥', err);
	if (err.isOperational) {
		return NextResponse.json(
			{
				status: err.statusCode,
				message: err.message
			},
			{
				status: err.statusCode,
				statusText:
					err.message instanceof String
						? err.message
						: 'Something went wrong, server side error 😵‍💫'
			}
		);
	} else {
		return NextResponse.json(
			{
				status: 500,
				message:
					'Something went wrong, server side error 😵‍💫'
			},
			{
				status: 500,
				statusText:
					err.message instanceof String
						? err.message
						: 'Something went wrong, server side error 😵‍💫'
			}
		);
	}
};

export function catchAsync(fn: any) {
	return async (req: NextRequest, res: NextResponse) => {
		return fn(req, res).catch((err: any) => {
			err.statusCode = err.statusCode || 500;
			err.status = err.status || 'error';
			if (process.env.NODE_ENV === 'production') {
				return errorProd(err);
			} else {
				return errorDev(err);
			}
		});
	};
}
