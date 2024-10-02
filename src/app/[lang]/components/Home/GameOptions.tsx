import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useGame } from '@/hooks/useGame';
import styles from '@/styles/pages/Home/components/GameOptions.module.scss';
import { LOCALES } from '@/utils/constants/board';
import { BoardSymbolEnum } from '@/utils/entities/board';

interface GameOptionsProps {
  resetGame: () => void;
  restartCounter: number;
}

export default function GameOptions({ resetGame, restartCounter }: GameOptionsProps) {
  const {
    state: { isRoundFinished, board },
  } = useGame();
  const t = useTranslations(LOCALES.HOME);

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
