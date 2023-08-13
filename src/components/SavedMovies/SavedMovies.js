import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn, isNavBarOpen, handleOpenNavBar }) {
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
        <Search />
        <MoviesCardList type="saved-movies" />
        <Devider type="saved-movies" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
