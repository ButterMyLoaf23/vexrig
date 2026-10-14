import { apiRequest } from '$lib/api/client';

export function registerAccount(account) {
	return apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(account) });
}

export function loginAccount(credentials) {
	return apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
}

export function logoutAccount() {
	return apiRequest('/auth/logout', { method: 'POST' });
}

export function getCurrentUser() {
	return apiRequest('/auth/me');
}
