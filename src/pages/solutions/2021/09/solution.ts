import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  benchmarkRuns: 5,
  first: (input: string) => {
    const heights: Record<string, number> = input.split('\n')
      .flatMap((line, lineIdx) =>
        line.split('').map((value, valueIdx) => ({
          key: {
            x: valueIdx,
            y: lineIdx,
          },
          value: parseInt(value),
        })))
      .reduce((heightMap: Record<string, number>, curr) => ({ ...heightMap, [`${curr.key.x}-${curr.key.y}`]: curr.value }), {});

    return Object.entries(heights).reduce((sum, [key, value]) => {
      const [x, y] = key.split('-').map(Number);
      if ((value < (heights[`${x - 1}-${y}`] ?? 9))
        && (value < (heights[`${x + 1}-${y}`] ?? 9))
        && (value < (heights[`${x}-${y - 1}`] ?? 9))
        && (value < (heights[`${x}-${y + 1}`] ?? 9))) {
        return sum + 1 + value;
      }
      return sum;
    }, 0);
  },
};
