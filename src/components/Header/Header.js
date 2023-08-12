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
      <div className="header__logo"></div>
      <Navigation
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
    </header>
  );
}

export default Header;
