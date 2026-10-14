<script>
	import { base } from '$app/paths';
	import { categories } from '$lib/data/parts';
	import { getParts } from '$lib/features/catalog/api';
	import { formatCurrency } from '$lib/utils/currency';

	let search = '';
	let category = 'all';
	let minPrice = '';
	let maxPrice = '';
	$: visibleParts = getParts({ search, category, minPrice, maxPrice });

	function clearFilters() {
		search = '';
		category = 'all';
		minPrice = '';
		maxPrice = '';
	}
</script>

<svelte:head><title>Parts Catalog — VexRig</title></svelte:head>

<section class="catalog-page">
	<div class="page-heading"><div><p class="eyebrow">Local catalog · no API key required</p><h1>Parts catalog</h1><p>Browse real component models from the starter catalog and add them to your build.</p></div><a class="button" href={`${base}/builder`}>Open builder</a></div>
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
			<article class="part-card panel"><div class="part-card-top"><span class="part-category">{part.category}</span><strong>{formatCurrency(part.price)}</strong></div><h2>{part.brand} {part.name}</h2><p>{part.description}</p><a class="button secondary" href={`${base}/builder`}>Choose in builder</a></article>
		{:else}<p class="empty-state panel">No parts match your filters. Try clearing the filters.</p>{/each}
	</div>
</section>
