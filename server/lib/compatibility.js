export function checkServerCompatibility(components) {
	const issues = [];
	const warnings = [];
	const byCategory = Object.fromEntries(components.map((component) => [component.category.toLowerCase(), component]));
	const cpu = byCategory.cpu;
	const motherboard = byCategory.motherboard;
	const memory = byCategory.ram;
	const computerCase = byCategory.case;
	const gpu = byCategory.gpu;
	const psu = byCategory.psu;

	if (cpu && motherboard && cpu.cpuSocket && motherboard.cpuSocket && cpu.cpuSocket !== motherboard.cpuSocket) issues.push(`CPU socket ${cpu.cpuSocket} does not match motherboard socket ${motherboard.cpuSocket}.`);
	if (motherboard && memory && motherboard.ramType && memory.ramType && motherboard.ramType !== memory.ramType) issues.push(`Motherboard supports ${motherboard.ramType}, but the selected memory is ${memory.ramType}.`);
	if (motherboard && computerCase && motherboard.formFactor && computerCase.formFactor && motherboard.formFactor !== computerCase.formFactor) issues.push(`${motherboard.formFactor} motherboard does not match the case form factor ${computerCase.formFactor}.`);
	if (gpu && computerCase && gpu.lengthMm && computerCase.lengthMm && gpu.lengthMm > computerCase.lengthMm) issues.push(`Graphics card is ${gpu.lengthMm}mm long, but the case record supports ${computerCase.lengthMm}mm.`);
	if (psu && psu.wattage) {
		const estimatedPower = components.reduce((total, component) => total + (component.wattage ?? 0), 100);
		if (estimatedPower > psu.wattage) issues.push(`Estimated draw is about ${estimatedPower}W, above the PSU's ${psu.wattage}W capacity.`);
	}
	if (components.length < 8) warnings.push('The build is incomplete, so only checks for selected parts were run.');
	return { compatible: issues.length === 0 && warnings.length === 0, issues, warnings };
}
