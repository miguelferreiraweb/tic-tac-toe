import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '@/styles/pages/Home/components/Board.module.scss';
import { BOARD_CELLS } from '@/utils/constants/board';
import { BoardSymbolEnum, BoardSymbolType } from '@/utils/entities/board';

interface BoardProps {
  board: BoardSymbolType[];
  handleCellClick: (_arg: number) => void;
}

export default function Board({ board, handleCellClick }: BoardProps) {
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
