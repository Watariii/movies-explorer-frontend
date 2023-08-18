import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies({
  loggedIn,
  isNavBarOpen,
  handleOpenNavBar,
  isSavedMoviesCard,
  handleSavedMoviesCard,
  inputText,
  handleChangeInputText,
  handleSubmitFoundMovies,
  moreMovies,
  movies,
  isLoading,
  isHideMoreButton,
  isActiveCheckbox,
  handleActiveCheckbox,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <main className={`movies ${isNavBarOpen ? "movies_opened" : ""}`}>
        <Search
          inputText={inputText}
          handleChangeInputText={handleChangeInputText}
          handleSubmitFoundMovies={handleSubmitFoundMovies}
          isActiveCheckbox={isActiveCheckbox}
          handleActiveCheckbox={handleActiveCheckbox}
        />
        <MoviesCardList
          type="movies"
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
          movies={movies}
        />
        <Preloader isLoading={isLoading} />
        <Devider type="movies" >
          <button
            onClick={moreMovies}
            type="button"
            className={`devider__button ${isHideMoreButton ? "devider__button_hide" : "" }`}
            aria-label="ещё"
          >
            Ещё
          </button>
        </Devider>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
