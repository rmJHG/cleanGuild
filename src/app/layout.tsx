import { SessionProvider } from "next-auth/react";
import RQProvider from "./_components/RQProvider";
import "./_styles/global.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "cleanguild",
  description: "인게임에서 부족한 길드관련 컨텐츠를 보충하는 사이트",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = (await auth()) as Session;
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4830932244446631"
          crossOrigin="anonymous"
        ></script>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <SessionProvider session={session}>
          <RQProvider>
            <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
          </RQProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
