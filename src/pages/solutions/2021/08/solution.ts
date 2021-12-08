import { Solution } from '@/solutions/Solution.interface';

const DIGIT_SEGMENT_LENGTHS = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
};

const UNIQUE_LENGTHS = [DIGIT_SEGMENT_LENGTHS[1], DIGIT_SEGMENT_LENGTHS[7], DIGIT_SEGMENT_LENGTHS[4], DIGIT_SEGMENT_LENGTHS[8]];

export const solution: Solution = {
  benchmarkRuns: 500,
  first: (input: string) => {
    const signals = input.split('\n')
      .map(line => line.split(' | ')
        .map(values => values.split(' ')));

    return signals.reduce((acc, curr) =>
      acc + curr[1].filter(value => UNIQUE_LENGTHS.includes(value.length)).length
    , 0);
  },
  second(input: string) {
    const signals = input.split('\n')
      .map(line => line.split(' | ')
        .map(values => values.split(' ')));

    return signals.reduce((acc, signal) => {
      const [input, output] = signal;
      const digits = ['', '', '', '', '', '', '', '', '', ''];
      digits[1] = input.find(value => value.length === DIGIT_SEGMENT_LENGTHS[1]) ?? '';
      digits[4] = input.find(value => value.length === DIGIT_SEGMENT_LENGTHS[4]) ?? '';
      digits[7] = input.find(value => value.length === DIGIT_SEGMENT_LENGTHS[7]) ?? '';
      digits[8] = input.find(value => value.length === DIGIT_SEGMENT_LENGTHS[8]) ?? '';
      const topLine = digits[7].split('').filter(value => !digits[1].split('').includes(value))[0];
      let bottomLine = '';

      let remainingInput = input.filter(value => !digits.includes(value));
      digits[9] = remainingInput.find((value) => {
        if (value.length !== DIGIT_SEGMENT_LENGTHS[9]) {
          return false;
        }

        const chars = value.split('');
        const fourChars = digits[4].split('');
        const rest = chars.filter(char => ![...fourChars, topLine].includes(char));
        if (rest.length === 1) {
          bottomLine = rest[0];
          return true;
        }
        return false;
      }) ?? '';

      remainingInput = remainingInput.filter(value => !digits.includes(value));
      let topRightLine = '';
      digits[5] = remainingInput.find((value) => {
        if (value.split('').filter(char => digits[1].includes(char)).length !== 1 || value.length !== DIGIT_SEGMENT_LENGTHS[5]) {
          return false;
        }

        const chars = value.split('');
        const fourChars = digits[4].split('');
        const charsWithoutTopAndBottom = chars.filter(char => ![topLine, bottomLine].includes(char));
        const rest = fourChars.filter(char => !charsWithoutTopAndBottom.includes(char));
        if (rest.length === 1) {
          topRightLine = rest[0];
          return true;
        }
        return false;
      }) ?? '';

      remainingInput = remainingInput.filter(value => !digits.includes(value));
      digits[6] = remainingInput.find(remainingValue => !remainingValue.split('').includes(topRightLine)) ?? '';

      remainingInput = remainingInput.filter(value => !digits.includes(value));
      digits[0] = remainingInput.find(remainingValue => remainingValue.length === DIGIT_SEGMENT_LENGTHS[0]) ?? '';

      remainingInput = remainingInput.filter(value => !digits.includes(value));
      digits[2] = remainingInput.find((remainingValue) => {
        const sevenDigits = digits[7].split('');
        return remainingValue.split('').filter(value => !sevenDigits.includes(value)).length === 3;
      }) ?? '';
      digits[3] = remainingInput.filter(value => !digits.includes(value))[0];

      const digitsSorted = digits.map(value => value.split('').sort().join(''));
      const outputSorted = output.map(value => value.split('').sort().join(''));
      const outputString = outputSorted.map(outPutValue => digitsSorted.indexOf(outPutValue)).join('');

      return acc + parseInt(outputString);
    }, 0);
  },
};
