import { useTranslations } from 'next-intl';
import React from 'react';

import styles from '@/styles/pages/Home/components/GameStatus.module.scss';
import { BoardSymbolType, RoundStatusEnum, RoundStatusType } from '@/utils/entities/board';

interface GameStatusProps {
  isRoundFinished: boolean;
  currentPlayer: BoardSymbolType;
  roundStatus: RoundStatusType;
}

export default function GameStatus({
  isRoundFinished,
  currentPlayer,
  roundStatus,
}: GameStatusProps) {
  const t = useTranslations('home');

  const renderRoundStatusMsg = (): JSX.Element =>
    roundStatus === RoundStatusEnum.Draw ? (
      <span>{t('its-a-draw')}</span>
    ) : (
      <span className={styles.winnerText}>
        {t('player')}&nbsp;{currentPlayer} {t('won')}!
      </span>
    );

  return (
    <div className={styles.statusContainer}>
      {isRoundFinished ? (
        renderRoundStatusMsg()
      ) : (
        <>
          {t('its-turn-of')} {currentPlayer}
        </>
      )}
    </div>
  );
}
