export function serializeComponent(component) {
	return {
		...component,
		price: Number(component.price)
	};
}

export function normalizeCategory(category) {
	return String(category ?? '').trim().toUpperCase();
}
