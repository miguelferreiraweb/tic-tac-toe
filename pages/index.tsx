import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import HeadComponent from '@/components/HeadComponent/HeadComponent';
import styles from '@/styles/Home.module.scss';
import {calculateRoundResult} from '@/utils/calculateRoundResult';
import {BOARD_CELLS, DRAW, PENDING, PLAYER_O, PLAYER_X, WIN} from '@/utils/globals';

const Home: NextPage = () => {
  const boardInitialState: Array<string> = ['','','','','','','','',''];
  const [board, setBoard] = useState(boardInitialState);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const { t } = useTranslation();

  const updateBoard = (index: number): void => {
    let updatedBoard: Array<string> = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    const result: string = calculateRoundResult(updatedBoard);

    switch(result){
      case WIN:
        console.log('winner');
        setIsRoundFinished(true);
        break;
      case DRAW:
        console.log('draw');
        setIsRoundFinished(true);
        break;
      case PENDING:
        updateNextPlayerTurn();
        break;
      default:
        updateNextPlayerTurn();
        break;
    }

  };

  const updateNextPlayerTurn = (): void => currentPlayer === PLAYER_X ? setCurrentPlayer(PLAYER_O) : setCurrentPlayer(PLAYER_X);

  const isCellEmpty = (index: number): boolean => !board[index];

  const renderBoard = () => 
      <div className={styles.boardContainer}>
        {[...Array(BOARD_CELLS)].map((item: any, index : number) => 
          <button 
            key={uuidv4()}
            className={styles[`cell-${index}`]}
            onClick={()=> handleCellClick(index)}>{board[index]}</button>)
        }
      </div>;

  // Handlers    

  const handleCellClick = (index: number): void => {
    if(isCellEmpty(index)){
      updateBoard(index);
    }
  };

  const handleRestartGameClick = (): void => {
    if(!isBoardEmpty()){
      setBoard(boardInitialState);
      setCurrentPlayer(PLAYER_X);
    }
  };

  const isBoardEmpty = (): boolean => !board.includes(PLAYER_X) && !board.includes(PLAYER_O);

  return (
    <div className={styles.container}>
      <HeadComponent />
      <main className={styles.main}>
        <div className={styles.start}>
          { isRoundFinished ? <>{t('player')}&nbsp;{currentPlayer} {t('won')}! </> : <>{t('its-turn-of')} {currentPlayer}</>}
        </div> 
        <div>{renderBoard()}</div>
        <div className={styles.restart}>
          <button onClick={handleRestartGameClick} disabled={isBoardEmpty() || isRoundFinished}>{t('restart')}</button>
        </div>
        <div className={styles.restart}>
          {t('latest-results')}
          <p>{t('player-x-wins')} - 0</p>
          <p>{t('player-o-wins')} - 0</p>
          </div>
      </main>
    </div>
  )
}

export const getStaticProps = async ({ locale } : any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default Home;
