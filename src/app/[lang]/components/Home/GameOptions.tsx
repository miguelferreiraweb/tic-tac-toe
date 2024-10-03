import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useGame } from '@/hooks/useGame';
import {
  getFinishRoundAction,
  getUpdateBoardAction,
  getUpdateCurrentPlayerAction,
} from '@/store/Game/gameActions';
import styles from '@/styles/pages/Home/components/GameOptions.module.scss';
import {
  BOARD_INITIAL_STATE,
  INITIAL_RESTART_COUNTER,
  INTERVAL_TIMER_MS,
  LOCALES,
} from '@/utils/constants/board';
import { BoardSymbolEnum } from '@/utils/entities/board';

export default function GameOptions() {
  const {
    state: { isRoundFinished, board, currentPlayer },
    dispatch,
  } = useGame();
  const [restartCounter, setRestartCounter] = useState<number>(INITIAL_RESTART_COUNTER);
  const t = useTranslations(LOCALES.HOME);

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

  const handleRestartGameClick = (): void => {
    if (!isBoardEmpty() && !isRoundFinished) {
      resetGame();
    }
  };

  const isBoardEmpty = (): boolean =>
    !board.includes(BoardSymbolEnum.PlayerX) && !board.includes(BoardSymbolEnum.PlayerO);

  return (
    <div className={styles.gameOptionsContainer}>
      <button
        onClick={handleRestartGameClick}
        className={clsx(styles.restartBtn, {
          [styles['restartBtn--disabled']]: isBoardEmpty(),
          [styles['restartBtn--reset']]: isRoundFinished,
        })}
        disabled={isBoardEmpty()}
      >
        {isRoundFinished ? (
          <>
            {t('restarting')} {restartCounter}
          </>
        ) : (
          t('restart')
        )}
      </button>
    </div>
  );
}
