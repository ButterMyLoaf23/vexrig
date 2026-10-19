import { Router } from 'express';
import { comparePassword, createAuthToken, getAuthCookieName, hashPassword, publicUser, setAuthCookie } from '../lib/auth.js';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function normalizeEmail(email) {
	return String(email ?? '').trim().toLowerCase();
}

function validateRegistration({ username, email, password }) {
	if (!username || String(username).trim().length < 3) return 'Username must be at least 3 characters.';
	if (!/^\S+@\S+\.\S+$/.test(normalizeEmail(email))) return 'Enter a valid email address.';
	if (!password || String(password).length < 8) return 'Password must be at least 8 characters.';
	return null;
}

router.post('/register', async (request, response) => {
	const username = String(request.body.username ?? '').trim();
	const email = normalizeEmail(request.body.email);
	const password = String(request.body.password ?? '');
	const validationError = validateRegistration({ username, email, password });
	if (validationError) return response.status(400).json({ message: validationError });

	try {
		const passwordHash = await hashPassword(password);
		const user = await prisma.user.create({ data: { username, email, passwordHash } });
		const token = createAuthToken(user);
		setAuthCookie(response, token);
		return response.status(201).json({ user: publicUser(user) });
	} catch (error) {
		if (error.code === 'P2002') return response.status(409).json({ message: 'Email is already in use.' });
		console.error('Registration failed:', error);
		return response.status(500).json({ message: 'Unable to create account.' });
	}
});

router.post('/login', async (request, response) => {
	const email = normalizeEmail(request.body.email);
	const password = String(request.body.password ?? '');

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		const passwordMatches = user ? await comparePassword(password, user.passwordHash) : false;
		if (!passwordMatches) return response.status(401).json({ message: 'Email or password is incorrect.' });

		setAuthCookie(response, createAuthToken(user));
		return response.json({ user: publicUser(user) });
	} catch (error) {
		console.error('Login failed:', error);
		return response.status(500).json({ message: 'Unable to log in.' });
	}
});

router.post('/logout', (_request, response) => {
	response.clearCookie(getAuthCookieName(), {
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/'
	});
	return response.status(204).send();
});

router.get('/me', requireAuth, (request, response) => response.json({ user: request.user }));

export default router;
