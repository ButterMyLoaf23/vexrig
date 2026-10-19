import { writable } from 'svelte/store';
import { getCurrentUser, logoutAccount } from './api';

export const currentUser = writable(null);
export const authReady = writable(false);

let currentUserRequest;

export async function loadCurrentUser() {
	if (currentUserRequest) return currentUserRequest;

	currentUserRequest = getCurrentUser()
		.then((response) => currentUser.set(response.user ?? null))
		.catch(() => currentUser.set(null))
		.finally(() => {
			authReady.set(true);
			currentUserRequest = null;
		});

	return currentUserRequest;
}

export function setCurrentUser(user) {
	currentUser.set(user ?? null);
}

export async function logOut() {
	try {
		await logoutAccount();
	} finally {
		currentUser.set(null);
	}
}
