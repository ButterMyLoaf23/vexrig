<script>
	import { base } from '$app/paths';
	import { categories } from '$lib/data/parts';
	import { getParts, getPriceOffers } from '$lib/features/catalog/api';
	import { formatCurrency } from '$lib/utils/currency';

	let search = '';
	let category = 'all';
	let minPrice = '';
	let maxPrice = '';
	let expandedPartId = null;
	let offersByPart = {};
	let loadingOffersFor = null;
	$: visibleParts = getParts({ search, category, minPrice, maxPrice });

	function clearFilters() {
		search = '';
		category = 'all';
		minPrice = '';
		maxPrice = '';
	}

	async function toggleOffers(part) {
		if (expandedPartId === part.id) {
			expandedPartId = null;
			return;
		}
		expandedPartId = part.id;
		if (offersByPart[part.id]) return;
		loadingOffersFor = part.id;
		try {
			offersByPart = { ...offersByPart, [part.id]: await getPriceOffers(part.id) };
		} catch {
			offersByPart = { ...offersByPart, [part.id]: [] };
		} finally {
			loadingOffersFor = null;
		}
	}
</script>

<svelte:head><title>Parts Catalog — VexRig</title></svelte:head>

<section class="catalog-page">
	<div class="page-heading"><div><p class="eyebrow">Component catalog</p><h1>Parts catalog</h1><p>Browse real component models from the starter catalog and add them to your build.</p></div><a class="button" href={`${base}/builder`}>Open builder</a></div>
	<div class="filters panel">
		<label>Search<input placeholder="Name or brand" bind:value={search} /></label>
		<label>Category<select bind:value={category}><option value="all">All categories</option>{#each categories as item}<option value={item.value}>{item.label}</option>{/each}</select></label>
		<label>Min price<input type="number" min="0" placeholder="$0" bind:value={minPrice} /></label>
		<label>Max price<input type="number" min="0" placeholder="No limit" bind:value={maxPrice} /></label>
		<button class="button secondary" on:click={clearFilters}>Clear filters</button>
	</div>
	<p class="result-count">{visibleParts.length} result{visibleParts.length === 1 ? '' : 's'}</p>
	<div class="catalog-grid">
		{#each visibleParts as part}
			<article class="part-card panel"><div class="part-card-top"><span class="part-category">{part.category}</span><strong>{formatCurrency(part.price)}</strong></div><h2>{part.brand} {part.name}</h2><p>{part.description}</p><div class="part-card-actions"><button class="button secondary" on:click={() => toggleOffers(part)}>{expandedPartId === part.id ? 'Hide prices' : 'Compare prices'}</button><a class="button secondary" href={`${base}/builder`}>Choose in builder</a></div>
				{#if expandedPartId === part.id}<div class="price-comparison"><h3>Retailer prices</h3>{#if loadingOffersFor === part.id}<p class="muted">Loading retailer links…</p>{:else if offersByPart[part.id]?.length}<div class="offer-list">{#each offersByPart[part.id] as offer}<div class="offer-row"><span>{offer.retailerName}</span>{#if offer.price !== null}<strong>{formatCurrency(offer.price)}</strong>{:else}<span class="muted">Price unavailable</span>{/if}<a href={offer.url} target="_blank" rel="noreferrer">View retailer</a></div>{/each}</div><small class="muted">Live prices appear when a retailer integration is configured. Retailer links are search links until then.</small>{:else}<p class="muted">No retailer data available yet.</p>{/if}</div>{/if}
			</article>
		{:else}<p class="empty-state panel">No parts match your filters. Try clearing the filters.</p>{/each}
	</div>
</section>
