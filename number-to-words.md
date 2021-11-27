# Number to Words

For example: given 999, return "nine-hundred ninety nine".

```javascript
const map = {
    0: {
        0: '',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    },
    1: {
        0: 'ten',
        1: 'eleven',
        2: 'twelve',
        3: 'thirteen',
        4: 'fourteen',
        5: 'fifteen',
        6: 'sixteen',
        7: 'seventeen',
        8: 'eighteen',
        9: 'nineteen',
    },
    2: 'twenty',
    3: 'thirty',
    4: 'fourty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety',
};

const numbersToWords = (number) => {
    const count_thousands = Math.floor((number / 1000) % 10);
    const count_hundreds = Math.floor((number / 100) % 10);
    const tens = Number(String(number).slice(-2));
    // const tens = Math.floor(number / 10 % 10);
    return number == 0
        ? 'zero'
        : (
              convertPlaceToWord(count_thousands, 'thousands') +
              ' ' +
              convertPlaceToWord(count_hundreds, 'hundreds') +
              ' ' +
              convertPlaceToWord(tens, 'tens')
          ).trim();
};

//

const convertPlaceToWord = (number, place) => {
    switch (place) {
        case 'thousands':
            return number == 0 ? '' : map[0][number] + '-thousand';
            break;
        case 'hundreds':
            return number == 0 ? '' : map[0][number] + '-hundred';
            break;
        case 'tens':
            const tens = Math.floor((number / 10) % 10);
            const ones = Math.floor(number % 10);
            return number < 20
                ? tens
                    ? map[tens][ones]
                    : map[0][ones]
                : ones
                ? map[tens] + ' ' + map[0][ones]
                : map[tens];
            break;
        case 'ones':
            return number == 0 ? '' : map[0][number];
            break;
    }
};

const number = 1201;
numbersToWords(number);
// 'one-thousand two-hundred one'
```
