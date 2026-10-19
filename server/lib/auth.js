import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authCookieName = 'vexrig_token';

function isSecureDeployment() {
	return process.env.NODE_ENV === 'production' || process.env.FRONTEND_URL?.startsWith('https://');
}

function getJwtSecret() {
	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is not configured.');
	}
	return process.env.JWT_SECRET;
}

export function publicUser(user) {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		createdAt: user.createdAt
	};
}

export function getAuthCookieName() {
	return authCookieName;
}

export function hashPassword(password) {
	return bcrypt.hash(password, 12);
}

export function comparePassword(password, passwordHash) {
	return bcrypt.compare(password, passwordHash);
}

export function createAuthToken(user) {
	return jwt.sign({ sub: String(user.id), username: user.username }, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyAuthToken(token) {
	return jwt.verify(token, getJwtSecret());
}

export function setAuthCookie(response, token) {
	response.cookie(authCookieName, token, {
		httpOnly: true,
		sameSite: isSecureDeployment() ? 'none' : 'lax',
		secure: isSecureDeployment(),
		maxAge: 7 * 24 * 60 * 60 * 1000,
		path: '/'
	});
}

export function getAuthCookieOptions() {
	return {
		httpOnly: true,
		sameSite: isSecureDeployment() ? 'none' : 'lax',
		secure: isSecureDeployment(),
		path: '/'
	};
}
