import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  benchmarkRuns: 1000,
  first(input: string) {
    return new Promise<number>((resolve) => {
      // @ts-ignore
      window.eleven_first(input, (result: number) => {
        resolve(result);
      });
    });
  },
  second(input: string) {
    return new Promise<number>((resolve) => {
      // @ts-ignore
      window.eleven_second(input, (result: number) => {
        resolve(result);
      });
    });
  },
};
