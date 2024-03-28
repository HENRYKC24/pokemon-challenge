import React from "react";
import PageLayout from "../containers/PageLayout";

const Home: React.FC = (): JSX.Element => {
  return (
    <PageLayout>
      <div>
        <h1>Hello Home!</h1>
        <p>This is a simple React component written in TypeScript.</p>
      </div>
    </PageLayout>
  );
};

export default Home;
