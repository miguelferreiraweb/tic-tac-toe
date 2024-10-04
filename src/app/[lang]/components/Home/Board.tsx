import clsx from 'clsx';
import React from 'react';

import { useGame } from '@/hooks/useGame';
import {
  getFinishRoundAction,
  getUpdateBoardAction,
  getUpdateCurrentPlayerAction,
  getUpdateRoundStatusAction,
} from '@/store/Game/gameActions';
import styles from '@/styles/pages/Home/components/Board.module.scss';
import { BOARD_CELLS } from '@/utils/constants/board';
import {
  BoardSymbolEnum,
  BoardSymbolType,
  RoundStatusEnum,
  RoundStatusType,
} from '@/utils/entities/board';
import { calculateRoundResult } from '@/utils/functions/calculateRoundResult';

export default function Board() {
  const {
    state: { isRoundFinished, board, currentPlayer },
    dispatch,
  } = useGame();

  const handleCellClick = (index: number): void => {
    if (isCellEmpty(index) && !isRoundFinished) {
      updateBoard(index);
    }
  };

  const isCellEmpty = (index: number): boolean => !board[index];

  const updateNextPlayerTurn = (): void =>
    currentPlayer === BoardSymbolEnum.PlayerX
      ? dispatch(getUpdateCurrentPlayerAction(BoardSymbolEnum.PlayerO))
      : dispatch(getUpdateCurrentPlayerAction(BoardSymbolEnum.PlayerX));

  const updateBoard = (index: number): void => {
    let updatedBoard: BoardSymbolType[] = [...board];
    updatedBoard[index] = currentPlayer;
    dispatch(getUpdateBoardAction(updatedBoard));
    const result: RoundStatusType = calculateRoundResult(updatedBoard);

    result === RoundStatusEnum.Finished || result === RoundStatusEnum.Draw
      ? dispatch(getFinishRoundAction(true))
      : updateNextPlayerTurn();

    dispatch(getUpdateRoundStatusAction(result));
  };

  return (
    <div className={styles.boardContainer}>
      {[...Array(BOARD_CELLS)].map((_item, i: number) => (
        <div
          key={`cell-${i}`}
          className={clsx(`${styles.cell} ${styles[`cell--${i}`]}`, {
            [styles.playerX]: board[i] === BoardSymbolEnum.PlayerX,
            [styles.playerO]: board[i] === BoardSymbolEnum.PlayerO,
          })}
          onClick={() => handleCellClick(i)}
        >
          {board[i]}
        </div>
      ))}
    </div>
  );
}
