import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./header.module.scss";
import PokemonLogo from "../../assets/images/pokemon_logo.jpeg";

import Socials from "../Socials";

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
        <div className={css.innerDiv}>
          <ul>
            <li>
              <Link
                className={getActiveTab() === "Home" ? css.active : ""}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pokemon-list"
                className={getActiveTab() === "Search" ? css.active : ""}
              >
                Search
              </Link>
            </li>
          </ul>
          <Socials height={15} width={15} gap="20px" size={0.8} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
