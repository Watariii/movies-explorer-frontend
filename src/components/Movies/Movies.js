import Header from "../Header/Header";
import Search from "../Search/Search";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Devider from "../Devider/Devider";
import Footer from "../Footer/Footer";

function Movies({ loggedIn, isNavBarOpen, handleOpenNavBar }) {
  return (
    <main className={`movies ${isNavBarOpen ? "movies_opened" : ""}`}>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <Search />
      <MoviesCardList />
      <Devider>
        <button className="devider__button" aria-label="ещё">Ещё</button>
      </Devider>
      <Footer />
    </main>
  );
}

export default Movies;
