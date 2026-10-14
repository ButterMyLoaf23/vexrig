// Future API adapter contract. Keep API keys out of browser code; this should
// call your own server endpoint, which can safely hold the third-party key.
export function createRemotePartsRepository({ baseUrl = '/api/components' } = {}) {
	return {
		async list(filters = {}) {
			const query = new URLSearchParams(filters);
			const response = await fetch(`${baseUrl}?${query}`);
			if (!response.ok) throw new Error('Unable to load parts from the remote catalog.');
			return response.json();
		},
		async getById(id) {
			const response = await fetch(`${baseUrl}/${id}`);
			if (!response.ok) throw new Error('Part was not found.');
			return response.json();
		}
	};
}
