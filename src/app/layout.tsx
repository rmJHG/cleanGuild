import Header from "./_component/Header";
import RQProvider from "./_component/RQProvider";
import "./global.css";
export const metadata = {
  title: "cleanGuild",
  description: "learn nextjs, reactQuery, zustand and Auth.js ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RQProvider>
          <header>
            <Header />
          </header>
          <main>{children}</main>
        </RQProvider>
      </body>
    </html>
  );
}
