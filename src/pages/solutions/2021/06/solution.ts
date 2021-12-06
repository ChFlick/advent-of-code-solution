import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  first: (input: string) => {
    let currentFish = input.split(',').map(Number);

    for (let i = 0; i < 80; i++) {
      currentFish = currentFish.map((fish) => {
        if (fish === 0) {
          return [8, 6];
        }
        else {
          return fish - 1;
        }
      })
        .flat();
    }

    return currentFish.length;
  },
  // second(input: string) {
  //   function getChildCountAtEndOfCycle(daysUntilReproduce: number, remainingDays: number): number {
  //     if (daysUntilReproduce > remainingDays) {
  //       return 1;
  //     }
  //
  //     const remainingDaysToReproduce = remainingDays - daysUntilReproduce;
  //     const timesReproduced = Math.floor(remainingDaysToReproduce / 7);
  //     const steps = Array.from({ length: timesReproduced }, (_, i) => 7 + i * 7);
  //     return steps.reduce((acc, step) => acc + getChildCountAtEndOfCycle(8, step), 1);
  //   }
  //   const currentFish = input.split(',').map(Number);
  //
  //   const result = currentFish.reduce((acc, fish) => acc + getChildCountAtEndOfCycle(fish, 80), 0);
  //
  //   return result;
  // },
};
