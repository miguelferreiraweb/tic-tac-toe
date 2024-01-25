import { DRAW, PENDING, WIN } from '@/utils/globals';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const calculateRoundResult = (board: string[]): string => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition: number[] = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    return WIN;
  }

  if (!board.includes('')) {
    return DRAW;
  }

  return PENDING;
};
