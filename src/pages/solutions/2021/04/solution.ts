import { Solution } from '@/solutions/Solution.interface';

export const solution: Solution = {
  first: (input: string) => {
    const [numbersInput, ...boardsInput] = input.split('\n\n');

    const numbers = numbersInput.split(',')
      .map(Number);
    const boards = boardsInput.map(
      board => board.split('\n')
        .map(row => row.trim().split(/ +/)
          .map(Number)));

    function calculateBoardWinnigRowValue(board: number[][], numbers: number[]) {
      for (const row of board) {
        if (row.every(n => numbers.includes(n))) {
          return row.reduce((a, b) => a + b, 0);
        }
      }

      for (let i = 0; i < board[0].length; i++) {
        const column = board.map(row => row[i]);
        if (column.every(n => numbers.includes(n))) {
          return column.reduce((a, b) => a + b, 0);
        }
      }

      return 0;
    }

    for (let i = 5; i < numbers.length; i++) {
      const currentNumbers = numbers.slice(0, i);
      const winningBoard = boards.find(board => calculateBoardWinnigRowValue(board, currentNumbers) > 0);
      if (winningBoard) {
        const valueOfNonMarkedNumbers = winningBoard.flat().filter(n => !currentNumbers.includes(n)).reduce((a, b) => a + b, 0);
        return valueOfNonMarkedNumbers * currentNumbers[i - 1];
      }
    }
    return 0;
  },
  second: (input: string) => {
    const [numbersInput, ...boardsInput] = input.split('\n\n');

    const numbers = numbersInput.split(',')
      .map(Number);
    const boards = boardsInput.map(
      board => board.split('\n')
        .map(row => row.trim().split(/ +/)
          .map(Number)));

    function calculateBoardWinnigRowValue(board: number[][], numbers: number[]) {
      for (const row of board) {
        if (row.every(n => numbers.includes(n))) {
          return row.reduce((a, b) => a + b, 0);
        }
      }

      for (let i = 0; i < board[0].length; i++) {
        const column = board.map(row => row[i]);
        if (column.every(n => numbers.includes(n))) {
          return column.reduce((a, b) => a + b, 0);
        }
      }

      return 0;
    }

    let remainingBoards = [...boards];
    let currentNumbers: number[] = [];
    let lastBoard: number[][] = [];

    // play as long as all boards are eleminated
    for (let i = 5; remainingBoards.length > 0; i++) {
      currentNumbers = numbers.slice(0, i);
      lastBoard = remainingBoards[0];
      remainingBoards = boards.filter(board => calculateBoardWinnigRowValue(board, currentNumbers) <= 0);
    }

    const valueOfNonMarkedNumbers = lastBoard.flat().filter(n => !currentNumbers.includes(n)).reduce((a, b) => a + b, 0);
    return valueOfNonMarkedNumbers * (currentNumbers.pop() ?? 0);
  },
};
