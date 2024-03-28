import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default PageLayout;
