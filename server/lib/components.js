export function serializeComponent(component) {
	return {
		...component,
		price: Number(component.price)
	};
}

export function normalizeCategory(category) {
	return String(category ?? '').trim().toUpperCase();
}

export function serializeOffer(offer) {
	return {
		...offer,
		price: offer.price === null || offer.price === undefined ? null : Number(offer.price),
		fetchedAt: offer.fetchedAt?.toISOString?.() ?? null
	};
}
