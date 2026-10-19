<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { registerAccount } from '$lib/features/auth/api';
	import { setCurrentUser } from '$lib/features/auth/store';

	let username = '';
	let email = '';
	let password = '';
	let error = '';
	let submitting = false;

	async function submit() {
		submitting = true;
		error = '';
		try {
			const response = await registerAccount({ username, email, password });
			setCurrentUser(response.user, response.token);
			await goto(`${base}/builder`);
		} catch (requestError) {
			error = requestError.message;
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head><title>Create an account — VexRig</title></svelte:head>

<section class="auth-page">
	<div class="auth-card panel">
		<p class="eyebrow">VexRig account</p>
		<h1>Create an account</h1>
		<p>Save builds and come back to them later.</p>
		<form on:submit|preventDefault={submit}>
			<label>Username<input required minlength="3" autocomplete="username" bind:value={username} /></label>
			<label>Email<input required type="email" autocomplete="email" bind:value={email} /></label>
			<label>Password<input required minlength="8" type="password" autocomplete="new-password" bind:value={password} /></label>
			{#if error}<p class="form-error" role="alert">{error}</p>{/if}
			<button class="button" disabled={submitting}>{submitting ? 'Creating account…' : 'Create account'}</button>
		</form>
		<p class="auth-switch">Already have an account? <a href={`${base}/login`}>Log in</a></p>
	</div>
</section>
