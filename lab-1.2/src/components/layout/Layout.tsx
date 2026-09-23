import type { ReactNode } from "react";
import Nav from "../navigation/Navigation";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className }: LayoutProps) {
  return (
    <>
      <Header />
      <Nav />

      <main className={className}>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default Layout;