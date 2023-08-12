import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(!loggedIn);
    navigate("/movies");
  }

  function handleOpenNavBar() {
    setIsNavBarOpen(!isNavBarOpen);
  }
 
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <Main
              loggedIn={loggedIn}
              isNavBarOpen={isNavBarOpen}
              handleOpenNavBar={handleOpenNavBar}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              loggedIn={loggedIn}
              isNavBarOpen={isNavBarOpen}
              handleOpenNavBar={handleOpenNavBar}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              loggedIn={loggedIn}
              isNavBarOpen={isNavBarOpen}
              handleOpenNavBar={handleOpenNavBar}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              handleLogin={handleLogin}
              loggedIn={loggedIn}
              isNavBarOpen={isNavBarOpen}
              handleOpenNavBar={handleOpenNavBar}
            />
          }
        />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/sign-up"
          element={<Register handleLogin={handleLogin} />}
        />
      </Routes>
      <InfoTooltip />
    </Layout>
  );
}

export default App;
