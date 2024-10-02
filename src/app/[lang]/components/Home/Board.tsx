import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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
        <button
          key={uuidv4()}
          className={`${styles.cell} ${styles[`cell--${i}`]}`}
          onClick={() => handleCellClick(i)}
        >
          <span className={board[i] === BoardSymbolEnum.PlayerX ? styles.playerX : styles.playerO}>
            {board[i]}
          </span>
        </button>
      ))}
    </div>
  );
}
