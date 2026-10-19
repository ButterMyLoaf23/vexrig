const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function getAuthToken() {
	return typeof localStorage === 'undefined' ? null : localStorage.getItem('vexrig_token');
}

export function setAuthToken(token) {
	if (typeof localStorage !== 'undefined' && token) localStorage.setItem('vexrig_token', token);
}

export function clearAuthToken() {
	if (typeof localStorage !== 'undefined') localStorage.removeItem('vexrig_token');
}

export async function apiRequest(path, init = {}) {
	const token = getAuthToken();
	const response = await fetch(`${API_BASE_URL}${path}`, {
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...init.headers
		},
		credentials: 'include',
		...init
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.message ?? `API request failed with status ${response.status}`);
	}

	if (response.status === 204) return null;
	return response.json();
}
