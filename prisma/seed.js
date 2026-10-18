import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { parts } from '../src/lib/data/parts.js';

const prisma = new PrismaClient();

const categoryMap = {
	cpu: 'CPU', gpu: 'GPU', motherboard: 'MOTHERBOARD', ram: 'RAM',
	storage: 'STORAGE', psu: 'PSU', case: 'CASE', cooler: 'COOLER'
};

const componentData = parts.map((part) => ({
	name: part.name,
	category: categoryMap[part.category],
	brand: part.brand,
	price: part.price,
	description: part.description,
	cpuSocket: part.socket ?? null,
	ramType: part.ramType ?? null,
	formFactor: part.formFactor ?? (part.category === 'case' ? 'ATX' : null),
	wattage: part.wattage ?? part.powerDraw ?? null,
	lengthMm: part.lengthMm ?? part.gpuLengthMm ?? null
}));

const existingCount = await prisma.component.count();
if (existingCount === 0) {
	await prisma.component.createMany({ data: componentData });
	console.log(`Seeded ${componentData.length} components.`);
} else {
	console.log(`Skipped component seed; ${existingCount} components already exist.`);
}

await prisma.$disconnect();
