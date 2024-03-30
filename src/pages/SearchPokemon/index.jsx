import { useState } from 'react';
import useSearch from '../../hooks/useSearch';
import GridPanel from '../../components/GridPanel';
import Loader from '../../components/Loader';
import PokemonCard from '../../components/PokemonCard';
import useModal from '../../hooks/useModal';
import css from './styles.module.scss';
import Paginationation from '../../components/Pagination';
import PageLayout from '../../containers/PageLayout';

const TERM = 'term';

const SearchPokemon = () => {
  const [term, setTerm] = useState('');
  const {
    currentPage,
    isSearch,
    loading,
    pokemons,
    reset,
    search,
    setPage,
    totalPages,
  } = useSearch();
  const { Modal, setPokemon } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term) {
      search(term);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === TERM) {
      setTerm(value);
    }
  };

  return (
    <PageLayout>
      <main className={css.main}>
      <div className={css.form_container}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="search"
            placeholder="Search your favorite Pokemon"
            name={TERM}
            value={term}
            onChange={handleChange}
            className={css.search}
          />
          <button
            type="submit"
            aria-label="submit"
            className={css.submit_btn}
          />
        </form>
        {isSearch ? (
          <button
            type="button"
            className={css.reset_btn}
            onClick={() => {
              setTerm('');
              reset();
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
      {pokemons.length ? (
        <>
          <div className={css.grid_container}>
            <GridPanel minimumChildWidth={240}>
              {pokemons.map((pokemon) => pokemon.sprites ? (
                <div key={pokemon.id} className={css.pokemon_container}>
                  <PokemonCard  pokemon={pokemon} onClick={setPokemon} />
                </div>
              ) : null)}
            </GridPanel>
          </div>
          <Paginationation currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <div className={css.empty_list}>
          <span>There is no result for this search</span>
        </div>
      )}
      <Modal />
      {loading ? (
        <Loader />
      ) : null}
    </main>
    </PageLayout>
  );
};

export default SearchPokemon;