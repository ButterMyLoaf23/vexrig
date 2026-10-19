<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authReady, currentUser, loadCurrentUser, logOut } from '$lib/features/auth/store';

	onMount(loadCurrentUser);

	async function handleLogout() {
		await logOut();
		await goto(`${base}/`);
	}
</script>

<header class="site-header">
	<a href={`${base}/`} aria-label="VexRig home">VexRig</a>
	<nav aria-label="Main navigation">
		<a href={`${base}/builder`}>PC Builder</a>
		<a href={`${base}/parts`}>Parts</a>
		<a href={`${base}/builds`}>My Builds</a>
		{#if $authReady}
			{#if $currentUser}
				<span class="user-label">{$currentUser.username}</span>
				<button class="logout-button" type="button" on:click={handleLogout}>Log out</button>
			{:else}
				<a href={`${base}/login`}>Log in</a>
				<a href={`${base}/register`}>Create account</a>
			{/if}
		{/if}
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
		align-items: center;
		gap: 1rem;
	}

	.user-label {
		color: #7dd3fc;
		font-size: .9rem;
	}

	.logout-button {
		border: 1px solid #405269;
		border-radius: .45rem;
		padding: .45rem .7rem;
		background: transparent;
		color: #aab6c7;
		font: inherit;
		cursor: pointer;
	}

	.logout-button:hover,
	.logout-button:focus {
		border-color: #7dd3fc;
		color: #7dd3fc;
	}
</style>
