import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./header.module.scss";
import PokemonLogo from "../../assets/images/pokemon_logo.jpeg";
import Icon from "@mdi/react";
import { mdiMenu, mdiWindowClose } from "@mdi/js";

import Socials from "../Socials";

const Header: React.FC = (): JSX.Element => {
  const location = useLocation();

  const hamburgerMenuRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const desktopRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const mobileRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const closeBtnRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  // Function to extract the active tab from the URL pathname
  const getActiveTab: () => {} = (): string => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/pokemon-list") return "Search";
    return "";
  };

  useEffect(() => {
    if (hamburgerMenuRef.current) {
      hamburgerMenuRef.current.addEventListener("click", () => {
        if (desktopRef.current && mobileRef.current) {
          desktopRef.current.style.display = "none";
          mobileRef.current.style.display = "flex";
          if (hamburgerMenuRef.current) {
            hamburgerMenuRef.current.style.display = "none";
          }
        }
      });
    }

    if (closeBtnRef.current) {
      closeBtnRef.current.addEventListener("click", () => {
        if (desktopRef.current && mobileRef.current && hamburgerMenuRef.current) {
          if (window.innerWidth > 768) {
            desktopRef.current.style.display = "flex";
            mobileRef.current.style.display = "none";
            hamburgerMenuRef.current.style.display = "none";
          } else {
            desktopRef.current.style.display = "none";
            mobileRef.current.style.display = "none";
            hamburgerMenuRef.current.style.display = "flex";
          }
        }
      });
    }

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width > 768) {
        if (desktopRef.current) {
          desktopRef.current.style.display = "flex";
          if (hamburgerMenuRef.current) {
            hamburgerMenuRef.current.style.display = "none";
          }
        }
        // if (mobileRef.current) {
        //   mobileRef.current.style.display = 'none';
        //   if (hamburgerMenuRef.current) {
        //     hamburgerMenuRef.current.style.display = "none";
        //   }
        // }
      } else {
        if (desktopRef.current) {
          desktopRef.current.style.display = "none";
          if (hamburgerMenuRef.current) {
            hamburgerMenuRef.current.style.display = "flex";
          }
        }
        // if (mobileRef.current) {
        //   mobileRef.current.style.display = 'flex';
        //   if (hamburgerMenuRef.current) {
        //     hamburgerMenuRef.current.style.display = "flex";
        //   }
        // }
      }
    });
  }, []);

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div>
          <Link to="/">
            <img height={50} width={100} src={PokemonLogo} alt="Pokemon logo" />
          </Link>
        </div>
        
        
        <div ref={desktopRef} className={css.innerDiv}>
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
          <Socials height={20} width={20} gap="20px" size={1.2} />
          </ul>
        </div>


        
        
        <div ref={mobileRef} className={css.mobile}>
          <span ref={closeBtnRef} className={css.closeBtn}>
            <Icon path={mdiWindowClose} size={1.5} />
          </span>
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
          <Socials height={20} width={20} gap="20px" size={1.2} />
          </ul>
        </div>


        <div ref={hamburgerMenuRef} className={css.hamburger}>
          <Icon path={mdiMenu} size={1.5} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
