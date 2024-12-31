import { SessionProvider } from 'next-auth/react';
import RQProvider from './_components/RQProvider';
import './_styles/global.css';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'GREMIO',
  description: '인게임에서 부족한 길드홍보 컨텐츠를 보충하는 사이트',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = (await auth()) as Session;

  return (
    <html lang="ko">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <meta name="google-adsense-account" content="ca-pub-4830932244446631" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <SessionProvider session={session}>
          <RQProvider>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: '1' }}>
              {children}
            </div>
          </RQProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
