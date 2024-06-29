import { SessionProvider } from "next-auth/react";
import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";
import "./global.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import GetUserData from "./_component/GetUserData";
import { ReactNode } from "react";
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
      <body>
        <SessionProvider session={session}>
          <RQProvider>
            <GetUserData />
            <header>
              <Header />
            </header>
            <main>{children}</main>
          </RQProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
