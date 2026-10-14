import { derived, writable } from 'svelte/store';

export const buildSelections = writable([]);
export const selectedPartCount = derived(buildSelections, ($selections) =>
	$selections.filter((selection) => selection.componentId).length
);
