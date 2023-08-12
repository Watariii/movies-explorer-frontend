import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
function Main({ loggedIn, isNavBarOpen, handleOpenNavBar }) {
  return (
    <main className={`content ${isNavBarOpen ? "content_opened" : ""}`}>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </main>
  );
}

export default Main;
