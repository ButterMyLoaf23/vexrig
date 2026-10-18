import { apiRequest } from '$lib/api/client';

export function getBuilds() {
	return apiRequest('/builds');
}

export function getBuild(id) {
	return apiRequest(`/builds/${id}`);
}

export function saveBuild(build) {
	const id = build.id ? `/${build.id}` : '';
	return apiRequest(`/builds${id}`, {
		method: build.id ? 'PUT' : 'POST',
		body: JSON.stringify({ name: build.name, components: build.components })
	});
}

export function deleteBuild(id) {
	return apiRequest(`/builds/${id}`, { method: 'DELETE' });
}
