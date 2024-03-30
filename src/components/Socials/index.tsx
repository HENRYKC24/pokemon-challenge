import React from "react";
import { Link } from "react-router-dom";
import css from "./socials.module.scss";
import Icon from "@mdi/react";
import XLogo from "../../assets/images/X_logo.svg";
import { mdiFacebook, mdiInstagram, mdiLinkedin } from "@mdi/js";

interface SocialsProps {
  gap: string;
  size: number;
  height?: number;
  width?: number;
}

const Socials: React.FC<SocialsProps> = ({
  gap,
  size,
  height,
  width,
}): JSX.Element => {
  return (
    <ul className={`${css.parent}`} style={{ gap }}>
      <Link to="https://www.facebook.com/Pokemon/">
        <li>
          <Icon path={mdiFacebook} size={size} />
        </li>
      </Link>
      <Link to="https://twitter.com/Pokemon">
        <li>
          <img
            className={css.svg}
            height={height}
            width={width}
            src={XLogo}
            alt="X logo"
          />
        </li>
      </Link>
      <Link to="https://www.instagram.com/pokemon/">
        <li>
          <Icon path={mdiInstagram} size={size} />
        </li>
      </Link>
      <Link to="https://www.linkedin.com/company/pokemon">
        <li>
          <Icon path={mdiLinkedin} size={size} />
        </li>
      </Link>
    </ul>
  );
};

export default Socials;
