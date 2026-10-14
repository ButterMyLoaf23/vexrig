// Local catalog snapshot. Prices are editable estimates, not live pricing.
// Keep external API credentials on the server when a remote source is added.
export const categories = [
	{ value: 'cpu', label: 'CPU' },
	{ value: 'gpu', label: 'Graphics card' },
	{ value: 'motherboard', label: 'Motherboard' },
	{ value: 'ram', label: 'Memory' },
	{ value: 'storage', label: 'Storage' },
	{ value: 'psu', label: 'Power supply' },
	{ value: 'case', label: 'Case' },
	{ value: 'cooler', label: 'CPU cooler' }
];

export const parts = [
	{ id: 'cpu-9800x3d', category: 'cpu', brand: 'AMD', name: 'Ryzen 7 9800X3D', price: 479.99, description: '8-core AM5 gaming processor with 3D V-Cache.', socket: 'AM5', powerDraw: 120 },
	{ id: 'cpu-9600x', category: 'cpu', brand: 'AMD', name: 'Ryzen 5 9600X', price: 249.99, description: '6-core AM5 desktop processor for gaming and everyday work.', socket: 'AM5', powerDraw: 65 },
	{ id: 'cpu-14700k', category: 'cpu', brand: 'Intel', name: 'Core i7-14700K', price: 369.99, description: 'Hybrid-core desktop processor using the LGA1700 socket.', socket: 'LGA1700', powerDraw: 253 },
	{ id: 'gpu-rx9070xt', category: 'gpu', brand: 'AMD', name: 'Radeon RX 9070 XT', price: 649.99, description: 'High-performance 16GB graphics card for high-refresh 1440p gaming.', lengthMm: 330, powerDraw: 304 },
	{ id: 'gpu-rtx5070ti', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 5070 Ti', price: 749.99, description: '16GB ray-tracing graphics card for 1440p and 4K gaming.', lengthMm: 304, powerDraw: 300 },
	{ id: 'gpu-rtx4060ti', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4060 Ti 16GB', price: 449.99, description: 'Efficient 16GB graphics card for mainstream gaming builds.', lengthMm: 305, powerDraw: 160 },
	{ id: 'mb-b850f', category: 'motherboard', brand: 'ASUS', name: 'ROG Strix B850-F Gaming WiFi', price: 299.99, description: 'ATX AM5 motherboard with DDR5 memory support and Wi-Fi.', socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX' },
	{ id: 'mb-b650tomahawk', category: 'motherboard', brand: 'MSI', name: 'MAG B650 Tomahawk WiFi', price: 199.99, description: 'ATX AM5 motherboard with DDR5 support and Wi-Fi 6E.', socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX' },
	{ id: 'mb-z790tomahawk', category: 'motherboard', brand: 'MSI', name: 'MAG Z790 Tomahawk MAX WiFi', price: 269.99, description: 'ATX LGA1700 motherboard with DDR5 memory support.', socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX' },
	{ id: 'ram-vengeance-ddr5', category: 'ram', brand: 'Corsair', name: 'Vengeance 32GB DDR5-6000', price: 109.99, description: '32GB kit made from two 16GB DDR5 modules.', ramType: 'DDR5' },
	{ id: 'ram-ripjaws-ddr4', category: 'ram', brand: 'G.Skill', name: 'Ripjaws V 32GB DDR4-3600', price: 64.99, description: '32GB kit made from two 16GB DDR4 modules.', ramType: 'DDR4' },
	{ id: 'storage-sn850x', category: 'storage', brand: 'WD_BLACK', name: 'SN850X 2TB NVMe SSD', price: 149.99, description: 'Fast PCIe 4.0 NVMe storage for games and applications.' },
	{ id: 'storage-p3plus', category: 'storage', brand: 'Crucial', name: 'P3 Plus 1TB NVMe SSD', price: 69.99, description: 'Affordable PCIe 4.0 NVMe storage for a responsive system.' },
	{ id: 'psu-rm850e', category: 'psu', brand: 'Corsair', name: 'RM850e 850W', price: 119.99, description: 'Fully modular ATX 3.1 80 Plus Gold power supply.', wattage: 850 },
	{ id: 'psu-rm650e', category: 'psu', brand: 'Corsair', name: 'RM650e 650W', price: 89.99, description: 'Fully modular ATX 3.1 80 Plus Gold power supply.', wattage: 650 },
	{ id: 'case-4000d', category: 'case', brand: 'Corsair', name: '4000D Airflow', price: 94.99, description: 'ATX mid-tower case with a high-airflow front panel.', supportedFormFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'], gpuLengthMm: 360 },
	{ id: 'case-h6flow', category: 'case', brand: 'NZXT', name: 'H6 Flow', price: 109.99, description: 'Panoramic ATX case with dual-chamber airflow design.', supportedFormFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'], gpuLengthMm: 365 },
	{ id: 'cooler-peerless', category: 'cooler', brand: 'Thermalright', name: 'Peerless Assassin 120 SE', price: 39.99, description: 'Dual-tower air cooler with broad modern socket support.', supportedSockets: ['AM5', 'AM4', 'LGA1700'] },
	{ id: 'cooler-arctic', category: 'cooler', brand: 'Arctic', name: 'Liquid Freezer III 240', price: 99.99, description: '240mm all-in-one liquid CPU cooler.', supportedSockets: ['AM5', 'AM4', 'LGA1700'] }
];
