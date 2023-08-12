import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn, isNavBarOpen, handleOpenNavBar }) {
  return (
    <main className={`saved-movies ${isNavBarOpen ? "saved-movies_opened" : ""}`}>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <Search />
      <MoviesCardList />
      <Devider />
      <Footer />
    </main>
  );
}

export default SavedMovies;
