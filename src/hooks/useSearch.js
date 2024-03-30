import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPageAsync,
  fetchPokemonsAsync,
  searchAsync,
  selectLoaded,
  selectPokemons,
} from '../redux/pokemon';

const PER_PAGE = 20;
const loadedPages = [];

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const allPokemons = useSelector(selectPokemons);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    pokemons: [],
    currentPage: 1,
    totalPages: 1,
    isSearch: false,
  });
  const loaded = useSelector(selectLoaded);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!loaded) {
      setLoading(true);
      dispatch(fetchPokemonsAsync());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    if (loaded) {
      loadedRef.current = true;
      dispatch(fetchPageAsync(0, PER_PAGE, (pokemons) => {
        const totalPages = Math.ceil(allPokemons.length / PER_PAGE);
        loadedPages.push(1);
        setState({ pokemons, currentPage: 1, totalPages });
  
        setLoading(false);
      }));
    }
  }, [loaded, allPokemons, dispatch]);

  const search = useCallback((term) => {
    setLoading(true);
    dispatch(searchAsync(term, (pokemon) => {
      const pokemons = pokemon ? [pokemon] : [];
      setState((state) => ({ pokemons, totalPages: 1, currentPage: state.currentPage, isSearch: true }));
      setLoading(false);
    }));
  }, [dispatch]);

  const reset = useCallback(() => {
    const totalPages = Math.ceil(allPokemons.length / PER_PAGE);
    setState((state) => {
      let pokemons = allPokemons;

      if (pokemons.length > PER_PAGE) {
        const start = ((state.currentPage || 1) - 1) * PER_PAGE;
        const end = start + PER_PAGE;

        pokemons = pokemons.filter((_, idx) => idx >= start && idx < end);
      }

      return {
        pokemons,
        totalPages,
        currentPage: state.currentPage,
        isSearch: false,
      }
    });
  }, [allPokemons]);

  const setPage = useCallback((page) => {
    const offset = (page - 1) * PER_PAGE;
    const lastIndex = offset + PER_PAGE;
    let totalPages = Math.ceil(allPokemons.length / PER_PAGE);

    console.log({ page });

    if (loadedPages.includes(page)) {
      console.log('Here');
      const pokemons = allPokemons.filter((p, idx) => idx >= offset && idx < lastIndex);
      setState({ pokemons, currentPage: page, totalPages, isSearch: false });
    } else {
      setLoading(true);
      dispatch(fetchPageAsync(offset, PER_PAGE, (pokemons) => {
        totalPages = Math.ceil(allPokemons.length / PER_PAGE);
        setState({ pokemons, totalPages, currentPage: page, isSearch: false });

        setLoading(false);
        loadedPages.push(page);
      }));
    }
  }, [allPokemons, dispatch]);

  return {
    ...state,
    loading,
    reset,
    search,
    setPage,
  };
};

export default useSearch;
