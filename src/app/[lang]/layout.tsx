import '@/styles/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
