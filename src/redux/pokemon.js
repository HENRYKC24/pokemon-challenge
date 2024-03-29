import { createSlice } from '@reduxjs/toolkit';
import { HOST, get } from '../api';

const slice = createSlice({
  name: 'pokemon',
  initialState: {
    loading: false,
    loaded: false,
    items: [],
  },
  reducers: {
    setPokemons: (state, { payload }) => {
      state.items = payload;
    },
    addPokemon: (state, { payload }) => {
      for (let i = 0; i < state.items.length; i += 1) {
        if (state.items[i].name === payload.name) {
          state.items[i] = payload;
          return;
        }
      }

      state.items.push(payload);
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setLoaded: (state, { payload }) => {
      state.loaded = payload;
    },
  },
});

export const {
  addPokemon,
  setLoaded,
  setLoading,
  setPokemons,
} = slice.actions;

const fetchPokemon = (url, callback) => {
  get(url)
    .then((pokemon) => callback(pokemon))
    .catch(() => callback());
};

export const fetchPageAsync = (start, count, callback) => (dispatch, getState) => {
  const { pokemon: { items } } = getState();
  const end = start + count;
  const range = items.filter((it, idx) => idx >= start && idx < end);
  const filtered = range.filter((it) => !it.sprites);

  if (!filtered.length) {
    callback(items.filter(range));
    return;
  }

  let idx = 0;
  const result = range.filter((it) => it.sprites);
  const handleFetched = (pokemon) => {
    idx += 1;
    
    if (pokemon) {
      dispatch(addPokemon(pokemon));
      result.push(pokemon);
      
      if (idx < filtered.length) {
        setTimeout(() => fetchPokemon(filtered[idx].url.split(HOST).pop(), handleFetched), 200);
      } else {
        callback(result);
      }
    } else if (idx < filtered.length) {
      fetchPokemon(filtered[idx].url.split(HOST).pop(), handleFetched)
    } else {
      callback(result);
    }
  };

  fetchPokemon(filtered[idx].url.split(HOST).pop(), handleFetched);
};

export const fetchPokemonsAsync = (callback) => (dispatch, getState) => {
  const { pokemon: { items, loading } } = getState();

  if (loading || items.length) {
    if (callback) {
      callback(null, items);
    }
    return;
  }

  dispatch(setLoading(true));

  get('pokemon?limit=150&offset=0')
    .then(({ results }) => {
      dispatch(setPokemons(results));
      dispatch(setLoading(false));
      dispatch(setLoaded(true));
    })
    .catch(({ message }) => {
      dispatch(setLoading(false));
      dispatch(setLoaded(true));
      if (callback) {
        callback(message);
      }
    });
};

export const searchAsync = (term, callback) => (dispatch, getState) => {
  const { pokemon: { items } } = getState();
  const pokemon = items.find((pkm) => (pkm.id === term || pkm.name === term));

  if (pokemon?.id) {
    if (callback) {
      callback(pokemon);
    }

    return;
  }

  get(`pokemon/${term}/`)
    .then((data) => {
      if (data) {
        dispatch(addPokemon(data));
      }

      if (callback) {
        callback(data);
      }
    })
    .catch(() => {
      callback(null);
    });
};

export const selectPokemons = (state) => state.pokemon.items;

export const selectLoading = (state) => state.pokemon.loading;
export const selectLoaded = (state) => state.pokemon.loaded;

export default slice.reducer;
