import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "../styles/header.module.scss";
import Icon from "@mdi/react";
import { mdiFacebook, mdiInstagram, mdiTwitter, mdiLinkedin } from "@mdi/js";
import PokemonLogo from "../assets/images/pokemon_logo.jpeg";

const Header: React.FC = (): JSX.Element => {
  const location = useLocation();

  // Function to extract the active tab from the URL pathname
  const getActiveTab: () => {} = (): string => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/pokemon-list") return "Search";
    return "";
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div>
          <Link to="/">
            <img height={50} width={100} src={PokemonLogo} alt="Pokemon logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link className={getActiveTab() === 'Home' ? css.active : ''} to="/">Home</Link>
          </li>
          <li>
            <Link to="/pokemon-list"  className={getActiveTab() === 'Search' ? css.active : ''}>Search</Link>
          </li>
          <li>
            <Link to="/">
              <Icon path={mdiFacebook} size={0.8} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <Icon path={mdiTwitter} size={0.8} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <Icon path={mdiInstagram} size={0.8} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <Icon path={mdiLinkedin} size={0.8} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;