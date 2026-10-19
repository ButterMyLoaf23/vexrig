<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { loginAccount } from '$lib/features/auth/api';
	import { setCurrentUser } from '$lib/features/auth/store';

	let email = '';
	let password = '';
	let error = '';
	let submitting = false;

	async function submit() {
		submitting = true;
		error = '';
		try {
			const response = await loginAccount({ email, password });
			setCurrentUser(response.user, response.token);
			await goto(`${base}/builder`);
		} catch (requestError) {
			error = requestError.message;
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head><title>Log in — VexRig</title></svelte:head>

<section class="auth-page">
	<div class="auth-card panel">
		<p class="eyebrow">Welcome back</p>
		<h1>Log in</h1>
		<p>Access your saved PC builds.</p>
		<form on:submit|preventDefault={submit}>
			<label>Email<input required type="email" autocomplete="email" bind:value={email} /></label>
			<label>Password<input required type="password" autocomplete="current-password" bind:value={password} /></label>
			{#if error}<p class="form-error" role="alert">{error}</p>{/if}
			<button class="button" disabled={submitting}>{submitting ? 'Logging in…' : 'Log in'}</button>
		</form>
		<p class="auth-switch">Need an account? <a href={`${base}/register`}>Create one</a></p>
	</div>
</section>
