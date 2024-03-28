import React from 'react';
import PageLayout from '../../containers/PageLayout';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <PageLayout>
      <div>
        <h1>Page not found!</h1>
        <p>Please make sure the url is correct or check your network connection.</p>
      </div>
    </PageLayout>
  );
};

export default NotFound;