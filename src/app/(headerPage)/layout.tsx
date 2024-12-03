import { ReactNode } from "react";

import Header from "../_components/layout/Header";
import Footer from "../_components/layout/Footer";
export default function NoHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ display: "flex", flexDirection: "column" }}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
