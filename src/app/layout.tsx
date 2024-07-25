import { SessionProvider } from "next-auth/react";
import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";
import "./global.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ReactNode } from "react";
import Footer from "./_component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveConsole from "./RemoveConsole";
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
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100dvw",
          height: "100dvh",
          backgroundColor: "#353535",
        }}
      >
        <SessionProvider session={session}>
          <RQProvider>
            <header style={{ width: "100%" }}>
              <Header />
            </header>
            <main style={{ flex: "1", display: "flex", justifyContent: "center" }}>
              <RemoveConsole />
              <ToastContainer />
              {children}
            </main>
            <footer style={{}}>
              <Footer />
            </footer>
          </RQProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
