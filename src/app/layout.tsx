import { SessionProvider } from 'next-auth/react';
import RQProvider from './_components/RQProvider';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './_styles/global.css';
import './_styles/font.css';
export const metadata = {
  title: 'GREMIO',
  description: '메이플스토리 길드홍보 커뮤니티',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = (await auth()) as Session;
  console.log(process.env.NODE_ENV);

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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1',
              }}
            >
              {children}
            </div>
          </RQProvider>
        </SessionProvider>
        <ToastContainer />
        {process.env.NODE_ENV !== 'development' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4830932244446631"
            crossOrigin="anonymous"
          ></script>
        )}
      </body>
    </html>
  );
}
