import type { NextPage } from 'next'
import { v4 as uuidv4 } from 'uuid';

import HeadComponent from '../components/HeadComponent/HeadComponent';
import styles from '../styles/Home.module.scss';

const BOARD_CELLS = 9;

const Home: NextPage = () => {

  const handleCellClick = (index: any) => {
    console.log(index);
  };

 const renderBoard = () => 
    <div className={styles.boardContainer}>
      {[...Array(BOARD_CELLS)].map((item, index) => 
        <button 
          key={uuidv4()}
          className={styles[`cell-${index}`]}
          onClick={()=> handleCellClick(index)}>X</button>)
      }
    </div>;

  return (
    <div className={styles.container}>
      <HeadComponent />
      <main className={styles.main}>
        <div className={styles.start}>Start playing | Its turn of X</div> 
        <div>{renderBoard()}</div>
        <div className={styles.restart}>Restart Game</div>
      </main>
    </div>
  )
}

export default Home;
