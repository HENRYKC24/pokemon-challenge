import React from 'react';
import PageLayout from '../../containers/PageLayout';

const SearchPokemon: React.FC = (): JSX.Element => {
  return (
    <PageLayout>
      <div>
        <h1>Search Pokemon!</h1>
        <p>This is a search page. Use it to search for pokemon.</p>
      </div>
    </PageLayout>
  );
};

export default SearchPokemon;