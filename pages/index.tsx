import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import HeadComponent from '@/components/HeadComponent/HeadComponent';
import styles from '@/styles/Home.module.scss';
import {BOARD_CELLS, PLAYER_O,PLAYER_X} from '@/utils/globals';

const Home: NextPage = () => {
  const boardInitialState: Array<String> = ['','','','','','','','',''];
  const [board, setBoard] = useState(boardInitialState);
  const [currentPlayer, seCurrentPlayer] = useState(PLAYER_X);
  const { t } = useTranslation();

  const updateBoard = (index: number) => {
    let updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
  };

  const updateNextPlayerTurn = () => currentPlayer === PLAYER_X ? seCurrentPlayer(PLAYER_O) : seCurrentPlayer(PLAYER_X);

  const isCellEmpty = (index: number) => !board[index];

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

  const handleCellClick = (index: number) => {
    if(isCellEmpty(index)){
      updateBoard(index);
      updateNextPlayerTurn();
    }
  };

  const handleRestartGameClick = () => {
    if(!isBoardEmpty()){
      setBoard(boardInitialState);
      seCurrentPlayer(PLAYER_X);
    }
  };

  const isBoardEmpty = () => !board.includes(PLAYER_X) && !board.includes(PLAYER_O);

  return (
    <div className={styles.container}>
      <HeadComponent />
      <main className={styles.main}>
        <div className={styles.start}>{t('its-turn-of')} {currentPlayer}</div> 
        <div>{renderBoard()}</div>
        <div className={styles.restart}>
          <button onClick={handleRestartGameClick} disabled={isBoardEmpty()}>{t('restart')}</button>
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
