import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";

function Movies({
  loggedIn,
  isNavBarOpen,
  handleOpenNavBar,
  isActiveMoviesCard,
  handleActiveMoviesCard,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <main className={`movies ${isNavBarOpen ? "movies_opened" : ""}`}>
        <Search />
        <MoviesCardList
          type="movies"
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <Devider type="movies">
          <button type="button" className="devider__button" aria-label="ещё">
            Ещё
          </button>
        </Devider>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
