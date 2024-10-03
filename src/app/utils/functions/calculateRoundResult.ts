import {
  BoardSymbolEnum,
  BoardSymbolType,
  RoundStatusEnum,
  RoundStatusType,
} from '@/utils/entities/board';

const winningConditions: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Iterates over all possible winning conditions. If the board symbols in those
 * positions are all the same ex: X = X = X or O = O = O, means that we have a winner.
 * @param board
 * @returns RoundStatusType
 */
export const calculateRoundResult = (board: BoardSymbolType[]): RoundStatusType => {
  let isRoundWon = false;

  for (let i = 0; i <= winningConditions.length - 1; i++) {
    const winCondition: number[] = winningConditions[i];
    // Get the current board symbols in these possible winning positions.
    // These board symbols might be filled or empty.
    let [boardSymbolA, boardSymbolB, boardSymbolC] = [
      board[winCondition[0]],
      board[winCondition[1]],
      board[winCondition[2]],
    ];

    // When symbols don't match for the current winCondition, we skip to the next iteration.
    if (boardSymbolA === '' || boardSymbolB === '' || boardSymbolC === '') {
      continue;
    }

    // All equal symbols means that we have a winner ex: X = X = X.
    if (boardSymbolA === boardSymbolB && boardSymbolB === boardSymbolC) {
      isRoundWon = true;
      break;
    }
  }

  if (isRoundWon) {
    return RoundStatusEnum.Finished;
  } else if (!board.includes('')) {
    return RoundStatusEnum.Draw;
  }

  return RoundStatusEnum.Pending;
};

export const getRandomStartingPlayer = () => {
  const players: BoardSymbolEnum[] = Object.values(BoardSymbolEnum);
  return players[Math.floor(Math.random() * players.length) | 0];
};
