const retailers = [
	{ key: 'AMAZON', name: 'Amazon', searchUrl: (query) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}` },
	{ key: 'WALMART', name: 'Walmart', searchUrl: (query) => `https://www.walmart.com/search?q=${encodeURIComponent(query)}` },
	{ key: 'BEST_BUY', name: 'Best Buy', searchUrl: (query) => `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}` },
	{ key: 'MICRO_CENTER', name: 'Micro Center', searchUrl: (query) => `https://www.microcenter.com/search/search_results.aspx?Ntt=${encodeURIComponent(query)}` },
	{ key: 'NEWEGG', name: 'Newegg', searchUrl: (query) => `https://www.newegg.com/p/pl?d=${encodeURIComponent(query)}` }
];

export function getRetailerSearchOffers(component) {
	const query = `${component.brand} ${component.name}`;
	return retailers.map((retailer) => ({
		id: null,
		retailer: retailer.key,
		retailerName: retailer.name,
		externalId: null,
		url: retailer.searchUrl(query),
		price: null,
		currency: 'USD',
		inStock: null,
		fetchedAt: null,
		isLive: false
	}));
}

export function mergeRetailerOffers(component, storedOffers) {
	const fallbackOffers = getRetailerSearchOffers(component);
	const storedByRetailer = new Map(storedOffers.map((offer) => [offer.retailer, offer]));
	return fallbackOffers.map((fallback) => {
		const stored = storedByRetailer.get(fallback.retailer);
		return stored ? { ...fallback, ...stored, retailerName: fallback.retailerName, isLive: true } : fallback;
	});
}
