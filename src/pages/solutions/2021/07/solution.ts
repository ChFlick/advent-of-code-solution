import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  benchmarkRuns: 500,
  first: (input: string) => {
    const numbers = input.split(',').map(Number);

    const getDistanceTo = (to: number, numbers: number[]) =>
      numbers.reduce((acc, curr) => acc + Math.abs(curr - to), 0);

    // Lucky I even got the correct hit here :D
    return Math.min(
      ...numbers.map(value => getDistanceTo(value, numbers)),
    );
  },
  second(input: string) {
    // can probably be optimized by finding a local minimum or so
    const numbers = input.split(',').map(Number);
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const potentialPositions = Array.from(
      { length: max - min },
      (_, i) => min + i + 1,
    );

    const getDistanceTo = (to: number, numbers: number[]) =>
      numbers.reduce((acc, curr) => {
        const n = Math.abs(curr - to);
        return acc + (n / 2 * (1 + n));
      }, 0);

    return Math.min(
      ...potentialPositions.map(value => getDistanceTo(value, numbers)),
    );
  },
};
