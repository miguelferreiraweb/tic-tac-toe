import clsx from 'clsx';
import HeadComponent from 'components/HeadComponent/HeadComponent';
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect,useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import styles from '@/styles/Home.module.scss';
import {calculateRoundResult} from '@/utils/calculateRoundResult';
import {
  BOARD_CELLS,
  DRAW,
  INITIAL_RESTART_COUNTER,
  LOCALES,
  PENDING,
  PLAYER_O,
  PLAYER_X,
  WIN,
  } from '@/utils/globals';

const Home: NextPage = () => {
  const BOARD_INITIAL_STATE: Array<string> = ['','','','','','','','',''];
  const [board, setBoard] = useState(BOARD_INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [roundStatus, setRoundStatus] = useState(PENDING);
  const [restartCounter, setRestartCounter] = useState(INITIAL_RESTART_COUNTER);
  const { t } = useTranslation();

  useEffect(()=> {
    let intervalId: any;

    if(isRoundFinished){
      intervalId = setInterval(()=> {
        setRestartCounter((restartCounter)=> restartCounter-1);

        if(restartCounter <= 0){
          resetGame();
          setRestartCounter(INITIAL_RESTART_COUNTER);
          return () => clearInterval(intervalId);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRoundFinished, restartCounter]);

  const updateBoard = (index: number): void => {
    let updatedBoard: Array<string> = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    const result: string = calculateRoundResult(updatedBoard);

    switch(result){
      case WIN:
        setIsRoundFinished(true);
        break;
      case DRAW:
        setIsRoundFinished(true);
        break;
      case PENDING:
        updateNextPlayerTurn();
        break;
      default:
        updateNextPlayerTurn();
        break;
    }

    setRoundStatus(result);
  };

  const updateNextPlayerTurn = (): void => currentPlayer === PLAYER_X ? setCurrentPlayer(PLAYER_O) : setCurrentPlayer(PLAYER_X);

  const isCellEmpty = (index: number): boolean => !board[index];

  const isBoardEmpty = (): boolean => !board.includes(PLAYER_X) && !board.includes(PLAYER_O);

  const resetGame = () => {
    setBoard(BOARD_INITIAL_STATE);
    setCurrentPlayer(PLAYER_X);
    setIsRoundFinished(false);
  };

  // Handlers

  const handleCellClick = (index: number): void => {
    if(isCellEmpty(index) && !isRoundFinished){
      updateBoard(index);
    }
  };

  const handleRestartGameClick = (): void => {
    if(!isBoardEmpty() && !isRoundFinished){
      resetGame();
    }
  };

  // Renders

  const renderBoard = () =>
  <div className={styles.boardContainer}>
    {[...Array(BOARD_CELLS)].map((item: any, index : number) =>
      <button
        key={uuidv4()}
        className={styles[`cell-${index}`]}
        onClick={()=> handleCellClick(index)}>{renderCellItem(board[index])}</button>)
    }
  </div>;

  const renderCellItem = (item: string) =>
    item === PLAYER_X ? <span className={styles.playerX}>{item}</span> : <span className={styles.playerO}>{item}</span>;

  const renderRoundStatusMsg = () => roundStatus === DRAW ?
    <span>{t('its-a-draw')}</span> : <span className={styles.winnerText}>{t('player')}&nbsp;{currentPlayer} {t('won')}! </span>;

  return (
    <div className={styles.container}>
      <HeadComponent />
      <main className={styles.main}>
        <div className={styles.start}>
          { isRoundFinished ? renderRoundStatusMsg() : <>{t('its-turn-of')} {currentPlayer}!</>}
        </div>
        <div>{renderBoard()}</div>
        <div className={styles.restart}>
          <button
            onClick={handleRestartGameClick}
            className={clsx({
                [styles.restartBtn] : !isBoardEmpty(),
                [styles.restartBtnDisabled] : isBoardEmpty(),
                [styles.autoRestartBtn]: isRoundFinished
            })}
            disabled={isBoardEmpty()}>{ isRoundFinished ? <>{t('restarting')} {restartCounter}</> : t('restart')}</button>
        </div>
        <div className={styles.results}>
          {t('latest-results')}
          <p>{t('player-x-wins')} - 0</p>
          <p>{t('player-o-wins')} - 0</p>
          <p>{t('draws')} - 0</p>
          </div>
      </main>
    </div>
  )
}

export const getStaticProps = async ({ locale } : any) => ({
  props: {
    ...await serverSideTranslations(locale, [LOCALES.COMMON]),
  },
});

export default Home;
