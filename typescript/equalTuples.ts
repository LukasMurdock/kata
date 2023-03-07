// [5, 4, 2, 1] -> [[5,1], [4,2]]
function calculateEqualTuples(array: number[]): number[][] | -1 {
	let sum = array.reduce((a, b) => a + b, 0);
	if (sum % 2 !== 0) {
		return -1;
	}
	let half = sum / 2;
	let result: number[][] = [];
	for (let i = 0; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			if (array[i] + array[j] === half) {
				result.push([array[i], array[j]]);
			}
		}
	}
	// if there are no tuples, return -1
	if (result.length === 0) {
		return -1;
	}

	return result;
}

// Test
const tuples = calculateEqualTuples([5, 4, 2, 1]);
if (tuples === -1 || tuples.length === 0) {
	console.log('no solution');
}

// sum tuples
// for every pair, multiply the first and second element and then sum them
let sum = 0;
// @ts-ignore
for (let i = 0; i < tuples.length; i++) {
	sum += tuples[i][0] * tuples[i][1];
}

console.log(sum);
// expect [[5,1], [4,2]]
// sum === 13
