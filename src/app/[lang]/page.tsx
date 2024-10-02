'use client';

import { useEffect, useState } from 'react';
import React from 'react';

import Board from '[lang]/components/Home/Board';
import GameOptions from '[lang]/components/Home/GameOptions';
import GameStatus from '[lang]/components/Home/GameStatus';
import { useGame } from '@/hooks/useGame';
import {
  getFinishRoundAction,
  getUpdateBoardAction,
  getUpdateCurrentPlayerAction,
} from '@/store/Game/gameActions';
import styles from '@/styles/pages/Home/Home.module.scss';
import {
  BOARD_INITIAL_STATE,
  INITIAL_RESTART_COUNTER,
  INTERVAL_TIMER_MS,
} from '@/utils/constants/board';
import { BoardSymbolEnum } from '@/utils/entities/board';

export default function Home() {
  const {
    state: { isRoundFinished, currentPlayer },
    dispatch,
  } = useGame();
  const [restartCounter, setRestartCounter] = useState<number>(INITIAL_RESTART_COUNTER);

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (isRoundFinished) {
      // runs the interval every second and decrements the restart counter.
      // when counter reaches 0, it will reset/restart the game.
      intervalId = setInterval(() => {
        setRestartCounter(restartCounter - 1);

        if (restartCounter <= 0) {
          resetGame();
          setRestartCounter(INITIAL_RESTART_COUNTER);
        }
      }, INTERVAL_TIMER_MS);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRoundFinished, restartCounter]);

  const resetGame = (): void => {
    dispatch(getUpdateBoardAction(BOARD_INITIAL_STATE));
    dispatch(
      getUpdateCurrentPlayerAction(
        currentPlayer === BoardSymbolEnum.PlayerX
          ? BoardSymbolEnum.PlayerO
          : BoardSymbolEnum.PlayerX
      )
    );
    dispatch(getFinishRoundAction(false));
  };

  return (
    <main className={styles.homeContainer}>
      <GameStatus />
      <Board />
      <GameOptions resetGame={resetGame} restartCounter={restartCounter} />
    </main>
  );
}
