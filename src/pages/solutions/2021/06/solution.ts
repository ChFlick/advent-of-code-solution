import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  benchmarkRuns: 1,
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
  second(input: string) {
    let fishByRemainingStatus: Record<number, number> = input.split(',')
      .map(Number)
      .reduce((fishByDay: Record<number, number>, fish) => {
        fishByDay[fish] = fishByDay[fish] ? fishByDay[fish] + 1 : 1;
        return fishByDay;
      }, {});

    for (let i = 0; i < 256; i++) {
      const newRemainingFish: Record<number, number> = {};
      Object.keys(fishByRemainingStatus).forEach((remainingFish) => {
        const fish = Number(remainingFish);
        if (fish === 0) {
          newRemainingFish[6] = (newRemainingFish[6] || 0) + fishByRemainingStatus[fish];
          newRemainingFish[8] = fishByRemainingStatus[fish];
        }
        else {
          newRemainingFish[fish - 1] = (newRemainingFish[fish - 1] || 0) + fishByRemainingStatus[fish];
        }
      });
      fishByRemainingStatus = newRemainingFish;
    }

    return Object.values(fishByRemainingStatus).reduce((total, fish) => total + fish, 0);
  },
};
