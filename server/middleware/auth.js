import { prisma } from '../lib/prisma.js';
import { getAuthCookieName, publicUser, verifyAuthToken } from '../lib/auth.js';

function readCookie(request, name) {
	const cookies = request.headers.cookie?.split(';').map((item) => item.trim()) ?? [];
	const cookie = cookies.find((item) => item.startsWith(`${name}=`));
	return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}

function readToken(request) {
	const authorization = request.headers.authorization;
	if (authorization?.startsWith('Bearer ')) return authorization.slice(7);
	return readCookie(request, getAuthCookieName());
}

export async function requireAuth(request, response, next) {
	try {
		const token = readToken(request);
		if (!token) return response.status(401).json({ message: 'Authentication required.' });

		const payload = verifyAuthToken(token);
		const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) } });
		if (!user) return response.status(401).json({ message: 'Authentication required.' });

		request.user = publicUser(user);
		return next();
	} catch (error) {
		return response.status(401).json({ message: 'Authentication required.' });
	}
}
