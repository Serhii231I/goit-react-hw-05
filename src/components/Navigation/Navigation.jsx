import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const Navigation = () => {
  return (
    <div className={css.navContainer}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}></NavLink>
        <NavLink to="movies" className={buildLinkClass}></NavLink>
      </nav>
    </div>
  );
};
export default Navigation;
