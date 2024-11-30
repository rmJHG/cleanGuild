import { ReactNode } from "react";
import NoHeader from "../_components/layout/NoHeader";
import Footer from "../_components/layout/Footer";
export default function NoHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <NoHeader />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
