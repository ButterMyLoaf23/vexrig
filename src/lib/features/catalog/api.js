import { parts } from '$lib/data/parts';
import { apiRequest } from '$lib/api/client';

let activeParts = parts;

export async function loadParts() {
	try {
		const remoteParts = await apiRequest('/components');
		activeParts = remoteParts.map((remotePart) => {
			const localPart = parts.find((part) => part.brand === remotePart.brand && part.name === remotePart.name);
			return {
				...localPart,
				...remotePart,
				category: localPart?.category ?? remotePart.category.toLowerCase(),
				id: remotePart.id,
				socket: remotePart.cpuSocket ?? localPart?.socket,
				powerDraw: remotePart.wattage ?? localPart?.powerDraw
			};
		});
	} catch {
		activeParts = parts;
	}

	return activeParts;
}

// Local-first repository. Replace this implementation with a server-backed
// adapter later without changing catalog or builder components.
export function getParts({ search = '', category = 'all', minPrice = '', maxPrice = '' } = {}) {
	const normalizedSearch = search.trim().toLowerCase();
	const minimum = minPrice === '' ? 0 : Number(minPrice);
	const maximum = maxPrice === '' ? Infinity : Number(maxPrice);

	return activeParts.filter((part) => {
		const matchesSearch = !normalizedSearch || `${part.brand} ${part.name}`.toLowerCase().includes(normalizedSearch);
		const matchesCategory = category === 'all' || part.category === category;
		return matchesSearch && matchesCategory && part.price >= minimum && part.price <= maximum;
	});
}

export function getPartById(id) {
	return activeParts.find((part) => part.id === id) ?? null;
}

export function getPartsByCategory(category) {
	return getParts({ category });
}
