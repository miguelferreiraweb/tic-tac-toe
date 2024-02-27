import clsx from 'clsx';
import type { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import HeadComponent from '@/components/HeadComponent/HeadComponent';
import styles from '@/styles/Home.module.scss';
import {
  BOARD_CELLS,
  INITIAL_RESTART_COUNTER,
  INTERVAL_TIMER_MS,
  LOCALES,
} from '@/utils/constants/board';
import {
  BoardSymbolEnum,
  BoardSymbolType,
  RoundStatusEnum,
  RoundStatusType,
} from '@/utils/entities/board';
import { calculateRoundResult } from '@/utils/functions/calculateRoundResult';

export const getStaticProps: GetStaticProps = async ({ locale = '' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [LOCALES.COMMON])),
  },
});

const BOARD_INITIAL_STATE: BoardSymbolType[] = ['', '', '', '', '', '', '', '', ''];

const Home: NextPage = (): JSX.Element => {
  const [board, setBoard] = useState<BoardSymbolType[]>(BOARD_INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<BoardSymbolType>(BoardSymbolEnum.PlayerX);
  const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false);
  const [roundStatus, setRoundStatus] = useState<RoundStatusType>(RoundStatusEnum.Pending);
  const [restartCounter, setRestartCounter] = useState<number>(INITIAL_RESTART_COUNTER);
  const { t } = useTranslation();

  console.log('test push avoidance to master branch');

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

  const updateBoard = (index: number): void => {
    let updatedBoard: BoardSymbolType[] = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    const result: RoundStatusType = calculateRoundResult(updatedBoard);

    switch (result) {
      case RoundStatusEnum.Win:
        setIsRoundFinished(true);
        break;
      case RoundStatusEnum.Draw:
        setIsRoundFinished(true);
        break;
      case RoundStatusEnum.Pending:
        updateNextPlayerTurn();
        break;
      default:
        updateNextPlayerTurn();
        break;
    }

    setRoundStatus(result);
  };

  const updateNextPlayerTurn = (): void =>
    currentPlayer === BoardSymbolEnum.PlayerX
      ? setCurrentPlayer(BoardSymbolEnum.PlayerO)
      : setCurrentPlayer(BoardSymbolEnum.PlayerX);

  const isCellEmpty = (index: number): boolean => !board[index];

  const isBoardEmpty = (): boolean =>
    !board.includes(BoardSymbolEnum.PlayerX) && !board.includes(BoardSymbolEnum.PlayerO);

  const resetGame = (): void => {
    setBoard(BOARD_INITIAL_STATE);
    setCurrentPlayer(BoardSymbolEnum.PlayerX);
    setIsRoundFinished(false);
  };

  // Handlers

  const handleCellClick = (index: number): void => {
    if (isCellEmpty(index) && !isRoundFinished) {
      updateBoard(index);
    }
  };

  const handleRestartGameClick = (): void => {
    if (!isBoardEmpty() && !isRoundFinished) {
      resetGame();
    }
  };

  // Renders

  const renderBoard = (): JSX.Element => (
    <div className={styles.boardContainer}>
      {[...Array(BOARD_CELLS)].map((_item, index: number) => (
        <button
          key={uuidv4()}
          className={styles[`cell-${index}`]}
          onClick={() => handleCellClick(index)}
        >
          {renderCellItem(board[index])}
        </button>
      ))}
    </div>
  );

  const renderCellItem = (item: string): JSX.Element => (
    <span className={item === BoardSymbolEnum.PlayerX ? styles.playerX : styles.playerO}>
      {item}
    </span>
  );

  const renderRoundStatusMsg = (): JSX.Element =>
    roundStatus === RoundStatusEnum.Draw ? (
      <span>{t('its-a-draw')}</span>
    ) : (
      <span className={styles.winnerText}>
        {t('player')}&nbsp;{currentPlayer} {t('won')}!
      </span>
    );

  return (
    <div className={styles.container}>
      <HeadComponent />
      <main className={styles.main}>
        <div className={styles.start}>
          {isRoundFinished ? (
            renderRoundStatusMsg()
          ) : (
            <>
              {t('its-turn-of')} {currentPlayer}!
            </>
          )}
        </div>
        {renderBoard()}
        <div className={styles.restart}>
          <button
            onClick={handleRestartGameClick}
            className={clsx({
              [styles.restartBtn]: !isBoardEmpty(),
              [styles.restartBtnDisabled]: isBoardEmpty(),
              [styles.autoRestartBtn]: isRoundFinished,
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
        <div className={styles.results}>
          {t('latest-results')}
          <p>{t('player-x-wins')} - 0</p>
          <p>{t('player-o-wins')} - 0</p>
          <p>{t('draws')} - 0</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
