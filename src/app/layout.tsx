import { SessionProvider } from "next-auth/react";
import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";
import "./global.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ReactNode } from "react";
import Footer from "./_component/Footer";
import UserDataProvider from "./_component/UserDataProvider";
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
          flexWrap: "wrap",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#353535",
        }}
      >
        <SessionProvider session={session}>
          <UserDataProvider>
            <RQProvider>
              <header style={{}}>
                <Header />
              </header>
              <main style={{ flex: "1" }}>{children}</main>
              <footer style={{}}>
                <Footer />
              </footer>
            </RQProvider>
          </UserDataProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
