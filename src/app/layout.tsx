import { SessionProvider } from 'next-auth/react';
import RQProvider from './_components/RQProvider';
import './_styles/global.css';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'MAPLE-GREMIO',
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
