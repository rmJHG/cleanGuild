import { SessionProvider } from "next-auth/react";
import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";
import "./global.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import GetUserData from "./_component/GetUserData";
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
      <body style={{ backgroundColor: "#353535", display: "flex", flexDirection: "column", height: "100vh" }}>
        <SessionProvider session={session}>
          {session && <GetUserData />}
          <RQProvider>
            <header style={{ flex: "0.2" }}>
              <Header />
            </header>
            <main style={{ flex: "9" }}>{children}</main>
            <footer style={{ flex: "0.5" }}>
              <Footer />
            </footer>
          </RQProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
