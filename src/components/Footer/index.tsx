import React from 'react';
import Socials from '../Socials';
import css from './footer.module.scss'
import { Link } from 'react-router-dom';

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={css.parent}>
      <Socials height={27} width={27} gap='20px' size={1.5} />
      <p>@{new Date().getFullYear()} Pokemon Explorer - <Link to="https://henrykc24.github.io/my-portfolio/">Henry KC</Link></p>
    </footer>
  );
};

export default Footer;