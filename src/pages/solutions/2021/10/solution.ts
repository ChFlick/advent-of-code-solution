import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  benchmarkRuns: 1000,
  first(input: string) {
    const BRACKET_PAIRS: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '<': '>',
    };
    const VALUES: Record<string, number> = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    };

    return input.split('\n').reduce((sum, line) => {
      const stack: string[] = [];
      for (const char of line) {
        if (Object.keys(BRACKET_PAIRS).includes(char)) {
          stack.push(char);
        }
        else {
          const openingBracket = stack.pop();
          if (!openingBracket) {
            throw new Error('No opening bracket found');
          }

          if (char !== BRACKET_PAIRS[openingBracket] && Object.values(BRACKET_PAIRS).includes(char)) {
            return sum + VALUES[char];
          }
        }
      }
      return sum;
    }, 0);
  },
  second(input: string) {
    const BRACKET_PAIRS: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '<': '>',
    };

    const VALUES: Record<string, number> = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    };

    const incompletes = input.split('\n').reduce((incompletes: string[][], line) => {
      const stack: string[] = [];
      for (const char of line) {
        if (Object.keys(BRACKET_PAIRS).includes(char)) {
          stack.push(char);
        }
        else {
          const openingBracket = stack.pop();
          if (!openingBracket) {
            throw new Error('No opening bracket found');
          }

          if (char !== BRACKET_PAIRS[openingBracket] && Object.values(BRACKET_PAIRS).includes(char)) {
            return incompletes;
          }
        }
      }
      return [...incompletes, stack.map(b => BRACKET_PAIRS[b]).reverse()];
    }, []);
    const incompleteValues = incompletes
      .map(incomplete => incomplete.reduce((sum, bracket) => sum * 5 + VALUES[bracket], 0))
      .sort((a, b) => a - b);
    return incompleteValues[(incompleteValues.length - 1) / 2];
  },
};
