import React from 'react';
import gif from '../../assets/images/loader.gif';
import css from './styles.module.scss';

const Loader: React.FC = (): JSX.Element => (
  <section role="alertdialog" className={css.container}>
    <div aria-hidden="true" className={css.dim} />
    <img src={gif} alt="pokemon" className={css.loading_icon} />
    <span className={css.text}>Loading ...</span>
  </section>
);

export default Loader;
