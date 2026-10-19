<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authReady, currentUser, loadCurrentUser } from '$lib/features/auth/store';

	onMount(async () => {
		await loadCurrentUser();
		if (!$currentUser) await goto(`${base}/login`);
	});
</script>

<svelte:head><title>Profile — VexRig</title></svelte:head>

{#if $authReady && $currentUser}
	<section class="page-heading">
		<div>
			<p class="eyebrow">VexRig account</p>
			<h1>Your profile</h1>
			<p>Manage your account details and saved PC builds.</p>
		</div>
	</section>

	<section class="profile-card panel">
		<div><span>Username</span><strong>{$currentUser.username}</strong></div>
		<div><span>Email</span><strong>{$currentUser.email}</strong></div>
		<div><span>Member since</span><strong>{new Date($currentUser.createdAt).toLocaleDateString()}</strong></div>
		<a class="button secondary" href={`${base}/builds`}>View my builds</a>
	</section>
{/if}

<style>
	.profile-card {
		display: grid;
		gap: 1.25rem;
		padding: 1.5rem;
		margin-bottom: 4rem;
	}

	.profile-card div {
		display: grid;
		gap: .3rem;
	}

	.profile-card span {
		color: #aab6c7;
		font-size: .85rem;
	}

	.profile-card strong {
		font-size: 1.1rem;
	}

	.profile-card .button {
		justify-self: start;
	}
</style>
