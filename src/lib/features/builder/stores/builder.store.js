import { derived, writable } from 'svelte/store';
import { getPartById } from '$lib/features/catalog/api';

export const buildSelections = writable({});
export const selectedBuildParts = derived(buildSelections, ($selections) =>
	Object.fromEntries(
		Object.entries($selections)
			.map(([slot, partId]) => [slot, getPartById(partId)])
			.filter(([, part]) => part)
	)
);
export const selectedPartCount = derived(selectedBuildParts, ($parts) => Object.keys($parts).length);
export const selectedBuildTotal = derived(selectedBuildParts, ($parts) =>
	Object.values($parts).reduce((total, part) => total + part.price, 0)
);

export function selectPart(slot, part) {
	buildSelections.update((selections) => ({ ...selections, [slot]: part.id }));
}

export function removePart(slot) {
	buildSelections.update((selections) => {
		const next = { ...selections };
		delete next[slot];
		return next;
	});
}

export function loadBuild(build) {
	buildSelections.set(Object.fromEntries(build.components.map((item) => [item.slot, item.componentId])));
}
