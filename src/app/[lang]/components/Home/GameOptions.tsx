import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

import styles from '@/styles/pages/Home/components/GameOptions.module.scss';

interface GameOptionsProps {
  handleRestartGameClick: () => void;
  restartCounter: number;
  isBoardEmpty: () => boolean;
  isRoundFinished: boolean;
}

export default function GameOptions({
  handleRestartGameClick,
  restartCounter,
  isBoardEmpty,
  isRoundFinished,
}: GameOptionsProps) {
  const t = useTranslations('home');

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
