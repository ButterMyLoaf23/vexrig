import { apiRequest } from '$lib/api/client';

export function getParts(query = '') {
	return apiRequest(`/components${query ? `?search=${encodeURIComponent(query)}` : ''}`);
}

export function getPartsByCategory(category) {
	return apiRequest(`/components/category/${category}`);
}
