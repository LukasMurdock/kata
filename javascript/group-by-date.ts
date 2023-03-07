function randDate() {
	return new Date(2022, 1, Math.random());
}

const data = [
	{ createdAt: randDate(), total: 10 },
	{ createdAt: randDate(), total: 2 },
];

const ordered = data.reduce((acc, curr) => {
	const dateString = curr.createdAt.toISOString().split('T')[0];
	if (!acc[dateString]) {
		acc[dateString] = curr.total;
	} else {
		acc[dateString] = acc[dateString] + curr.total;
	}
	return acc;
}, {} as { [key: string]: number });
