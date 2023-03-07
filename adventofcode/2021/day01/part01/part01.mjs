// @ts-check
import { readFile } from 'fs/promises';

async function getData(filename) {
    const data = await readFile(filename);
    return data.toString().split('\n').map(Number);
}

// ./sample_input.txt
// input.txt
const data = await getData('./input.txt');

let compare = [false];
for (let index = 1; index < data.length; index++) {
    compare[index] = data[index] > data[index - 1];
}

console.log(compare.reduce((a, b) => Number(a) + Number(b), 0));
