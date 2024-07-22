import { SessionProvider } from "next-auth/react";
import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";
import "./global.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ReactNode } from "react";
import Footer from "./_component/Footer";

export const metadata = {
  title: "cleanGuild",
  description: "Learn nextjs, reactQuery, zustand and Auth.js ",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = (await auth()) as Session;
  return (
    <html lang="ko">
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
            <main style={{ flex: "1" }}>{children}</main>
            <footer style={{}}>
              <Footer />
            </footer>
          </RQProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
