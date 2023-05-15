import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOptions {
	expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
	expiresIn: '1d'
};

export function signToken(
	payload: JwtPayload,
	options: SignOptions = DEFAULT_SIGN_OPTIONS
) {
	const secretKey = process.env.JWT_SECRET_KEY;
	const token = jwt.sign(payload, secretKey!, options);
	return token;
}

export function verifyToken(token: string) {
	try {
		const secretKey = process.env.JWT_SECRET_KEY;
		const decoded = jwt.verify(token, secretKey!);
		return decoded as JwtPayload;
	} catch (err) {
		console.error(err);
		return null;
	}
}
