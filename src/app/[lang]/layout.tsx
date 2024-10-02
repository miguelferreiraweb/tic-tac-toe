import '@/styles/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { GameProvider } from '@/store/Game/GameProvider';

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'Simple tic tac toe game',
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const messages = useMessages();
  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider locale='en' messages={messages}>
          <GameProvider>{children}</GameProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
