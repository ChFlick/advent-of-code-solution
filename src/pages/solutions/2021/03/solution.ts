import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  first: (input: string) => {
    const data = input.split('\n');

    const gammaBinary = data[0].split('')
      .map((_, index) => {
        const oneCount = data.reduce((acc, line) => acc + Number(line[index]), 0);
        return Number(oneCount >= data.length / 2);
      })
      .join('');

    const gammaValue = parseInt(gammaBinary, 2);
    const epsilonValue = (gammaValue >>> 0) ^ parseInt('1'.repeat(gammaBinary.length), 2);

    return gammaValue * epsilonValue;
  },
  second: (input: string) => {
    const data = input.split('\n');

    const countOnes = (arr: string[], idx: number) => arr.reduce((acc, curr) => acc + (curr[idx] === '1' ? 1 : 0), 0);

    let oxy = [...data];
    for (let i = 0; oxy.length > 1; ++i) {
      const count = countOnes(oxy, i);
      const mostCommonBit = Number(count >= (oxy.length / 2));
      oxy = oxy.filter(line => Number(line[i]) === mostCommonBit);
    }

    let co2 = [...data];
    for (let i = 0; co2.length > 1; ++i) {
      const count = countOnes(co2, i);
      const leastCommonBit = Number(count < (co2.length / 2));
      co2 = co2.filter(line => Number(line[i]) === leastCommonBit);
    }

    return parseInt(oxy[0], 2) * parseInt(co2[0], 2);
  },
};
