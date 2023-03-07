// deno run --allow-read 01/01.ts

const PERSON_DELIMITER = '\n\n';
const RECORD_DELIMITER = '\n';

function sum(array: String[]) {
	return array.map(Number).reduce((sum, val) => sum + val);
}

async function readCalorieFile() {
	return await Deno.readTextFile('./01/input.txt');
}

async function getCalorieSums() {
	const text = await readCalorieFile();
	return text.split(PERSON_DELIMITER).reduce((acc, curr) => {
		acc.push(sum(curr.split(RECORD_DELIMITER)));
		return acc;
	}, []);
}

function filterNumber(array: number[], number: number) {
	return array.filter((i) => i !== number);
}

const records = await getCalorieSums();

const firstPlace = Math.max(...records);

const filterFirstPlace = filterNumber(records, firstPlace);
const secondPlace = Math.max(...filterFirstPlace);

const filterSecondPlace = filterNumber(filterFirstPlace, secondPlace);
const thirdPlace = Math.max(...filterSecondPlace);

console.log(firstPlace + secondPlace + thirdPlace);
