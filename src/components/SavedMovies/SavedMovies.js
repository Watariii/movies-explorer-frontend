import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";

function SavedMovies({
  loggedIn,
  isNavBarOpen,
  handleOpenNavBar,
  renderSavedMovies,
  handleSaveMovie,
  inputTextSavedMovie,
  handleChangeInputTextSavedMovie,
  isActiveCheckboxSavedMovie,
  handleActiveCheckboxSavedMovie,
  handleSubmitFoundSavedMovies
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <main
        className={`saved-movies ${isNavBarOpen ? "saved-movies_opened" : ""}`}
      >
        <Search
          inputText={inputTextSavedMovie}
          handleChangeInputText={handleChangeInputTextSavedMovie}
          handleSubmitFound={handleSubmitFoundSavedMovies}
          isActiveCheckbox={isActiveCheckboxSavedMovie}
          handleActiveCheckbox={handleActiveCheckboxSavedMovie}
        />
        <MoviesCardList
          type="saved-movies"
          movies={renderSavedMovies}
          handleSaveMovie={handleSaveMovie}
        />
        <Devider type="saved-movies" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
