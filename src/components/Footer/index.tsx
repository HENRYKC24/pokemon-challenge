import React from 'react';
import Socials from '../Socials';
import css from './footer.module.scss'

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={css.parent}>
      <Socials height={27} width={27} gap='20px' size={1.5} />
    </footer>
  );
};

export default Footer;