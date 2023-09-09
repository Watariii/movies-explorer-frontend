import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import SearchResultMessage from "../SearchResultMessage/SearchResultMessage";

function Movies({
  loggedIn,
  isNavBarOpen,
  handleOpenNavBar,
  inputTextMovie,
  handleChangeInputTextMovie,
  handleSubmitFoundMovies,
  moreMovies,
  movies,
  isLoading,
  isHideMoreButton,
  isActiveCheckboxMovie,
  handleActiveCheckboxMovie,
  onMessageResult,
  isMessageResultOpen,
  handleSaveMovie,
  checkSavingMovie,
  onSearchResultMessage,
  isOpenSearchResultMessage,
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
          inputText={inputTextMovie}
          handleChangeInputText={handleChangeInputTextMovie}
          handleSubmitFound={handleSubmitFoundMovies}
          isActiveCheckbox={isActiveCheckboxMovie}
          handleActiveCheckbox={handleActiveCheckboxMovie}
        />
        <MoviesCardList
          type="movies"
          movies={movies}
          handleSaveMovie={handleSaveMovie}
          checkSavingMovie={checkSavingMovie}
        />
        <SearchResultMessage
          onSearchResultMessage={onSearchResultMessage}
          isOpenSearchResultMessage={isOpenSearchResultMessage}
        />
        <Preloader
          isLoading={isLoading}
          onMessageResult={onMessageResult}
          isMessageResultOpen={isMessageResultOpen}
        />
        <Devider type="movies">
          <button
            onClick={moreMovies}
            type="button"
            className={`devider__button ${
              isHideMoreButton ? "devider__button_hide" : ""
            }`}
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
