import { useTranslations } from 'next-intl';
import React from 'react';

import { useGame } from '@/hooks/useGame';
import styles from '@/styles/pages/Home/components/GameStatus.module.scss';
import { LOCALES } from '@/utils/constants/board';
import { RoundStatusEnum } from '@/utils/entities/board';

export default function GameStatus() {
  const {
    state: { isRoundFinished, currentPlayer, roundStatus },
  } = useGame();
  const t = useTranslations(LOCALES.HOME);

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
