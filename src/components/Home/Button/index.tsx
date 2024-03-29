import React from "react";
import { Link } from "react-router-dom";
import css from "./button.module.scss";

interface ButtonProps {
  text: string;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ text, to }): JSX.Element => {
  return (
    <Link to={to}>
      <button className={css.btn}>{text}</button>
    </Link>
  );
};

export default Button;
