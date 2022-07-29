import type { NextPage } from 'next';
import Head from 'next/head';

const HeadComponent: NextPage = () => {
  return (
      <Head>
        <title>Tic tac toe</title>
        <meta name="description" content="Tic tac toe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

export default HeadComponent;
