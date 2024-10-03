'use client';

import React from 'react';

import Board from '[lang]/components/Home/Board';
import GameOptions from '[lang]/components/Home/GameOptions';
import GameStatus from '[lang]/components/Home/GameStatus';
import styles from '@/styles/pages/Home/Home.module.scss';

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <GameStatus />
      <Board />
      <GameOptions />
    </main>
  );
}
