<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { deleteBuild, getBuilds } from '$lib/features/builds/api';
	import { formatCurrency } from '$lib/utils/currency';

	let builds = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			builds = await getBuilds();
		} catch (requestError) {
			error = requestError.message;
		} finally {
			loading = false;
		}
	});

	async function removeBuild(build) {
		if (!confirm(`Delete “${build.name}”?`)) return;
		try {
			await deleteBuild(build.id);
			builds = builds.filter((item) => item.id !== build.id);
		} catch (requestError) {
			error = requestError.message;
		}
	}
</script>

<svelte:head><title>My Builds — VexRig</title></svelte:head>

<section class="catalog-page">
	<div class="page-heading"><div><p class="eyebrow">Your account</p><h1>My builds</h1><p>Open, edit, or delete your saved PC builds.</p></div><a class="button" href={`${base}/builder`}>New build</a></div>
	{#if loading}<p class="panel empty-state">Loading your builds…</p>
	{:else if error}<p class="panel empty-state form-error" role="alert">{error}. <a href={`${base}/login`}>Log in</a> if your session has expired.</p>
	{:else if !builds.length}<p class="panel empty-state">You have no saved builds yet. Start a build to see it here.</p>
	{:else}
		<div class="catalog-grid">
			{#each builds as build}
				<article class="part-card panel"><span class="part-category">Saved build</span><h2>{build.name}</h2><p>Estimated total: <strong>{formatCurrency(build.totalPrice)}</strong></p><div class="build-actions"><a class="button secondary" href={`${base}/builder?id=${build.id}`}>Open & edit</a><button class="remove-button" on:click={() => removeBuild(build)}>Delete</button></div></article>
			{/each}
		</div>
	{/if}
</section>
