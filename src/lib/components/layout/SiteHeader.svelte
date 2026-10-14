<script>
	import { base } from '$app/paths';
</script>

<header class="site-header">
	<a href={`${base}/`} aria-label="VexRig home">VexRig</a>
	<nav aria-label="Main navigation">
		<a href={`${base}/builder`}>PC Builder</a>
		<a href={`${base}/parts`}>Parts</a>
		<a href={`${base}/builds`}>My Builds</a>
	</nav>
</header>

<style>
	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.5rem;
	}

	nav {
		display: flex;
		gap: 1rem;
	}
</style>
