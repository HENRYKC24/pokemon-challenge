import React, { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import css from "./pageLayout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className={css.parent}>
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
