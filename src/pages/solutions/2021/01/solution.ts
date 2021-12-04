import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  first: (input: string) => `${input
    .split('\n')
    .map(Number)
    .reduce((sum, curr, idx, arr) => curr > arr[idx - 1] ? sum + 1 : sum, 0)}`,
  second: (input: string) => `${input
    .split('\n')
    .map(Number)
    .map((val, idx, arr) => val + arr[idx + 1] + arr[idx + 2])
    .slice(0, -2)
    .reduce((sum, curr, idx, arr) => curr > arr[idx - 1] ? sum + 1 : sum, 0)}`,
};
