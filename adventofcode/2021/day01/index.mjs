// @ts-check
import { readFile } from 'fs/promises';

async function getData(filename) {
    const data = await readFile(filename);
    return data
        .toString()
        .split('\n')
        .map((row) => {
            const [number, ...tags] = row.split(/[ ]+/);
            return { number, tags };
        });
}

// ./sample_input.txt
// input.txt
const data = await getData('./sample_input.txt');
// console.log(data);

const windows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let compare = [false];
for (let index = 0; index < windows.length; index++) {
    // console.log(windows[index]);
    // const
    console.log(
        data
            .filter((item) => item.tags.includes(windows[index]))
            .map((item) => Number(item.number))
            .reduce((a, b) => a + b, 0)
    );

    // compare[index] = data[index] > data[index - 1];
}

// console.log(compare.reduce((a, b) => Number(a) + Number(b), 0));
