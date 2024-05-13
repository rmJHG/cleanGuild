import Header from "./_component/Header";
import "./global.css";
export const metadata = {
  title: "clean-maple",
  description: "learn nextjs, reactQuery, zustand and Auth.js ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header>
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
