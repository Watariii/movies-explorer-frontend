import { NavLink, Link } from "react-router-dom";
function Navigation({ loggedIn, isNavBarOpen, handleOpenNavBar }) {
  return (
    <>
      <nav
        className={`navigation ${loggedIn ? "navigation_logged-in" : ""} ${
          isNavBarOpen ? "navigation_opened" : ""
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navigation__main ${isActive ? "navigation_active" : ""} ${
              loggedIn ? "navigation__main_logged-in" : ""
            }`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `navigation__films ${isActive ? "navigation_active" : ""} ${
              loggedIn ? "navigation__films_logged-in" : ""
            }`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `navigation__saved ${isActive ? "navigation_active" : ""} ${
              loggedIn ? "navigation__saved_logged-in" : ""
            }`
          }
        >
          Сохраненные фильмы
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `navigation__account ${isActive ? "navigation_active" : ""} ${
              loggedIn ? "navigation__account_logged-in" : ""
            }`
          }
        >
          Аккаунт <div className="navigation__account-icon"></div>
        </NavLink>
        <Link
          to="/sign-up"
          className={`navigation__registration ${
            loggedIn ? "navigation__registration_logged-in" : ""
          } `}
        >
          Регистрация
        </Link>
        <Link
          to="/sign-in"
          className={`navigation__login ${
            loggedIn ? "navigation__login_logged-in" : ""
          }`}
        >
          Войти
        </Link>
      </nav>
      <button
        className={`navigation__button ${
          loggedIn ? "navigation__button_logged-in" : ""
        } ${isNavBarOpen ? "navigation__button_opened" : ""}`}
        onClick={handleOpenNavBar}
        aria-label="навигация"
      ></button>
    </>
  );
}

export default Navigation;
