import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  first: (input: string) => {
    interface Data {
      range: number
      depth: number
    }

    const commandMap: Record<string, (data: Data, value: number) => Data> = {
      forward: ({ range, depth }, value) => ({ range: range + value, depth }),
      down: ({ range, depth }, value) => ({ range, depth: depth + value }),
      up: ({ range, depth }, value) => ({ range, depth: depth - value }),
    };

    const result = input
      .split('\n')
      .map(line => line.split(' '))
      .map(([command, value]) => ({ command, value: parseInt(value) }))
      .reduce((acc, { command, value }) => commandMap[command](acc, value), { range: 0, depth: 0 });

    return result.range * result.depth;
  },
  second: (input: string) => {
    interface Data {
      range: number
      depth: number
      aim: number
    }

    const commandMap: Record<string, (data: Data, value: number) => Data> = {
      forward: ({ range, depth, aim }, value) => ({ range: range + value, depth: depth + aim * value, aim }),
      down: ({ range, depth, aim }, value) => ({ range, depth, aim: aim + value }),
      up: ({ range, depth, aim }, value) => ({ range, depth, aim: aim - value }),
    };

    const result = input
      .split('\n')
      .map(line => line.split(' '))
      .map(([command, value]) => ({ command, value: parseInt(value) }))
      .reduce((acc, { command, value }) => commandMap[command](acc, value), { range: 0, depth: 0, aim: 0 });

    return result.range * result.depth;
  },
};
