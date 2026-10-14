import { parts } from '$lib/data/parts';

// Local-first repository. Replace this implementation with a server-backed
// adapter later without changing catalog or builder components.
export function getParts({ search = '', category = 'all', minPrice = '', maxPrice = '' } = {}) {
	const normalizedSearch = search.trim().toLowerCase();
	const minimum = minPrice === '' ? 0 : Number(minPrice);
	const maximum = maxPrice === '' ? Infinity : Number(maxPrice);

	return parts.filter((part) => {
		const matchesSearch = !normalizedSearch || `${part.brand} ${part.name}`.toLowerCase().includes(normalizedSearch);
		const matchesCategory = category === 'all' || part.category === category;
		return matchesSearch && matchesCategory && part.price >= minimum && part.price <= maximum;
	});
}

export function getPartById(id) {
	return parts.find((part) => part.id === id) ?? null;
}

export function getPartsByCategory(category) {
	return getParts({ category });
}
