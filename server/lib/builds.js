import { prisma } from './prisma.js';

const allowedSlots = new Set(['CPU', 'GPU', 'MOTHERBOARD', 'RAM', 'STORAGE', 'PSU', 'CASE', 'COOLER']);

export function normalizeComponents(components) {
	if (!Array.isArray(components)) throw new Error('Components must be an array.');
	return components.map((item) => {
		const slot = String(item.slot ?? '').trim().toUpperCase();
		const componentId = Number(item.componentId);
		const slotIndex = Number(item.slotIndex ?? 0);
		if (!allowedSlots.has(slot) || !Number.isInteger(componentId) || !Number.isInteger(slotIndex) || slotIndex < 0) throw new Error('Invalid build component.');
		return { slot, componentId, slotIndex };
	});
}

export async function getVerifiedComponents(components) {
	const ids = [...new Set(components.map((item) => item.componentId))];
	const records = await prisma.component.findMany({ where: { id: { in: ids } } });
	if (records.length !== ids.length) throw new Error('One or more selected components do not exist.');
	return records;
}

export function calculateBuildTotal(components) {
	return components.reduce((total, component) => total + Number(component.price), 0).toFixed(2);
}

export function serializeBuild(build) {
	return {
		id: build.id,
		name: build.name,
		totalPrice: Number(build.totalPrice),
		createdAt: build.createdAt,
		updatedAt: build.updatedAt,
		components: build.buildComponents?.map((item) => ({
			componentId: item.componentId,
			slot: item.slot.toLowerCase(),
			slotIndex: item.slotIndex,
			component: item.component ? { ...item.component, price: Number(item.component.price) } : undefined
		})) ?? []
	};
}
