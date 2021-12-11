import { Solution } from '@/solutions/Solution.interface';

function coordHash([x, y]: [number, number]): string {
  return `${x}-${y}`;
}
function resolveHash(hash: string): [number, number] {
  const [x, y] = hash.split('-').map(Number);
  return [x, y];
}

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
  second: (input: string) => {
    const heights: Record<string, number> = input.split('\n')
      .flatMap((line, lineIdx) =>
        line.split('').map((value, valueIdx) => ({
          key: [valueIdx, lineIdx] as [number, number],
          value: parseInt(value),
        })))
      .reduce((heightMap: Record<string, number>, curr) => ({ ...heightMap, [coordHash(curr.key)]: curr.value }), {});

    const lowPoints = Object.entries(heights).reduce((lowPoints: string[], [key, value]) => {
      const [x, y] = resolveHash(key);
      if ((value < (heights[coordHash([x - 1, y])] ?? 9))
        && (value < (heights[coordHash([x + 1, y])] ?? 9))
        && (value < (heights[coordHash([x, y - 1])] ?? 9))
        && (value < (heights[coordHash([x, y + 1])] ?? 9))) {
        return [...lowPoints, key];
      }
      return lowPoints;
    }, []);

    function findBasinPoints([x, y]: [x: number, y: number], pointsInBasin: string[], map: Record<string, number>): string[] {
      if ((map[coordHash([x, y])] ?? 9) === 9 || pointsInBasin.includes(coordHash([x, y]))) {
        return pointsInBasin;
      }
      else {
        const newPointsInBasin = [...pointsInBasin, coordHash([x, y])];
        const upCoords = findBasinPoints([x, y - 1], newPointsInBasin, map);
        const leftCoords = findBasinPoints([x - 1, y], upCoords, map);
        const rightCoords = findBasinPoints([x + 1, y], leftCoords, map);
        return findBasinPoints([x, y + 1], rightCoords, map);
      }
    }

    const basins = lowPoints.map(lowPoint => findBasinPoints(resolveHash(lowPoint), [], heights));
    const basinSizes = basins.map(basin => basin.length).sort((a, b) => b - a);

    return basinSizes[0] * basinSizes[1] * basinSizes[2];
  },
};
