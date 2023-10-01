import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Header({
  loggedIn,
  isNavBarOpen,
  handleOpenNavBar,
}) {
  return (
    <header
      className={`header ${loggedIn ? "header_logged-in" : ""}`}
    >
      <Logo/>
      <Navigation
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <button
        type="button"
        className={`header__button-navigation ${
          loggedIn ? "header__button-navigation_logged-in" : ""
        } ${isNavBarOpen ? "header__button-navigation_opened" : ""}`}
        onClick={() => handleOpenNavBar()}
        aria-label="навигация"
      ></button>
    </header>
  );
}

export default Header;
