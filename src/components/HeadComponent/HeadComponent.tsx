import type { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const HeadComponent: NextPage = () => {
  const { t } = useTranslation();

  return (
      <Head>
        <title>{t('head.title')}</title>
        <meta name="description" content={t('head.content')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

export default HeadComponent;
