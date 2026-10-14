<script>
	import { categories } from '$lib/data/parts';
	import { formatCurrency } from '$lib/utils/currency';
	import { getParts } from '$lib/features/catalog/api';
	import { checkCompatibility } from '../compatibility';
	import { buildSelections, selectedBuildParts, selectedBuildTotal, selectedPartCount, removePart, selectPart } from '../stores/builder.store';

	let search = '';
	let activeCategory = 'all';
	$: visibleParts = getParts({ search, category: activeCategory });
	$: compatibility = checkCompatibility($selectedBuildParts);

	function addPart(part) {
		selectPart(part.category, part);
	}
</script>

<svelte:head><title>PC Builder — VexRig</title></svelte:head>

<section class="builder-header">
	<div>
		<p class="eyebrow">Local catalog · no API key required</p>
		<h1>Build your PC</h1>
		<p>Choose parts from the local catalog. VexRig checks common compatibility rules in your browser.</p>
	</div>
	<div class="total-card"><span>Estimated total</span><strong>{formatCurrency($selectedBuildTotal)}</strong><small>{$selectedPartCount} of 8 categories selected</small></div>
</section>

<div class="builder-grid">
	<section class="panel picker-panel" aria-labelledby="parts-heading">
		<div class="panel-heading"><div><h2 id="parts-heading">Choose parts</h2><p>{visibleParts.length} parts available</p></div><input aria-label="Search parts" placeholder="Search parts" bind:value={search} /></div>
		<div class="filter-row" aria-label="Filter parts by category">
			<button class:active={activeCategory === 'all'} on:click={() => (activeCategory = 'all')}>All</button>
			{#each categories as category}<button class:active={activeCategory === category.value} on:click={() => (activeCategory = category.value)}>{category.label}</button>{/each}
		</div>
		<div class="part-list">
			{#each visibleParts as part}
				<article class="part-card"><div class="part-card-top"><span class="part-category">{part.category}</span><strong>{formatCurrency(part.price)}</strong></div><h3>{part.brand} {part.name}</h3><p>{part.description}</p><button class="button secondary" on:click={() => addPart(part)}>{$buildSelections[part.category] === part.id ? 'Selected' : 'Add to build'}</button></article>
			{:else}<p class="empty-state">No parts match those filters.</p>{/each}
		</div>
	</section>

	<aside class="panel build-panel" aria-labelledby="build-heading">
		<div class="panel-heading"><div><h2 id="build-heading">Your build</h2><p>Choose another part to replace a selection.</p></div></div>
		<div class="slot-list">
			{#each categories as category}
				<div class="slot-row"><div><span class="part-category">{category.label}</span>{#if $selectedBuildParts[category.value]}<strong>{$selectedBuildParts[category.value].brand} {$selectedBuildParts[category.value].name}</strong>{:else}<span class="muted">Empty slot</span>{/if}</div>{#if $selectedBuildParts[category.value]}<button class="remove-button" aria-label={`Remove ${category.label}`} on:click={() => removePart(category.value)}>Remove</button>{/if}</div>
			{/each}
		</div>
		<div class={`compatibility ${compatibility.status}`}><h3>{compatibility.status === 'compatible' ? '✓ Compatibility looks good' : compatibility.status === 'warning' ? '⚠ Compatibility needs review' : '× Compatibility issue'}</h3>{#if compatibility.issues.length}<ul>{#each compatibility.issues as issue}<li>{issue}</li>{/each}</ul>{/if}{#if compatibility.warnings.length}<ul>{#each compatibility.warnings as warning}<li>{warning}</li>{/each}</ul>{/if}{#if !compatibility.issues.length && !compatibility.warnings.length}<p>Select more parts to run additional checks.</p>{/if}</div>
	</aside>
</div>
