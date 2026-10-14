export function checkCompatibility(selectedParts) {
	const issues = [];
	const warnings = [];
	if (Object.keys(selectedParts).length < 8) warnings.push('The build is incomplete, so only the checks for selected parts are being run.');
	const cpu = selectedParts.cpu;
	const motherboard = selectedParts.motherboard;
	const memory = selectedParts.ram;
	const computerCase = selectedParts.case;
	const gpu = selectedParts.gpu;
	const psu = selectedParts.psu;
	const cooler = selectedParts.cooler;

	if (cpu && motherboard) {
		if (cpu.socket && motherboard.socket && cpu.socket !== motherboard.socket) issues.push(`CPU socket ${cpu.socket} does not match motherboard socket ${motherboard.socket}.`);
		else if (!cpu.socket || !motherboard.socket) warnings.push('CPU socket compatibility could not be verified.');
	}
	if (motherboard && memory) {
		if (motherboard.ramType && memory.ramType && motherboard.ramType !== memory.ramType) issues.push(`Motherboard supports ${motherboard.ramType}, but the selected memory is ${memory.ramType}.`);
		else if (!motherboard.ramType || !memory.ramType) warnings.push('Memory compatibility could not be verified.');
	}
	if (motherboard && computerCase) {
		if (motherboard.formFactor && computerCase.supportedFormFactors && !computerCase.supportedFormFactors.includes(motherboard.formFactor)) issues.push(`${motherboard.formFactor} motherboard does not fit the selected case.`);
		else if (!motherboard.formFactor || !computerCase.supportedFormFactors) warnings.push('Motherboard and case fit could not be verified.');
	}
	if (gpu && computerCase) {
		if (gpu.lengthMm && computerCase.gpuLengthMm && gpu.lengthMm > computerCase.gpuLengthMm) issues.push(`Graphics card is ${gpu.lengthMm}mm long, but the case supports ${computerCase.gpuLengthMm}mm.`);
		else if (!gpu.lengthMm || !computerCase.gpuLengthMm) warnings.push('Graphics card length could not be verified.');
	}
	if (cooler && cpu && cooler.supportedSockets && cpu.socket && !cooler.supportedSockets.includes(cpu.socket)) issues.push(`The selected cooler does not list support for the CPU socket ${cpu.socket}.`);
	if (psu) {
		const estimatedPower = Object.values(selectedParts).reduce((total, part) => total + (part.powerDraw ?? 0), 100);
		if (psu.wattage && estimatedPower > psu.wattage) issues.push(`Estimated draw is about ${estimatedPower}W, above the PSU's ${psu.wattage}W capacity.`);
		else if (!psu.wattage) warnings.push('Power capacity could not be verified.');
	}
	return { status: issues.length ? 'incompatible' : warnings.length ? 'warning' : 'compatible', issues, warnings };
}
