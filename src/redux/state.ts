import { configureStore } from '@reduxjs/toolkit';
import pokemon from './pokemon';

export const createStore = () => configureStore({
  reducer: {
    pokemon
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const store = createStore();

export default store;
