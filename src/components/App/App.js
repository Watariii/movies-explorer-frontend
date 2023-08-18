/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
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

import { getMovies } from "../../utils/MoviesApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [isSavedMoviesCard, setIsSavedMoviesCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);

  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(!loggedIn);
    navigate("/movies");
  }

  function handleOpenNavBar() {
    setIsNavBarOpen(!isNavBarOpen);
  }

  function handleSavedMoviesCard() {
    setIsSavedMoviesCard(!isSavedMoviesCard);
  }

  function handleActiveCheckbox() {
    setIsActiveCheckbox(!isActiveCheckbox);
  }
//---------------------------------------------------------------------------------------
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [inputText, setInput] = useState("");
  const [isHideMoreButton, setIsHideMoreButton] = useState(false);

  function handleChangeInputText(evt) {
    setInput(evt.target.value);
  }

  useEffect(() => {
    if (movies.length === allMovies.length) {
      setIsHideMoreButton(true);
    } else {
      setIsHideMoreButton(false);
    }
  }, [allMovies.length, movies.length]);

  function handleSubmitFoundMovies() {
    setAllMovies([]);
    setMovies([]);
    setIsLoading(true);
    getMovies()
      .then((items) => {
        let allMoviesArray = [];
        let shortMoviesArray = [];
        if (!isActiveCheckbox) {
          if (inputText !== "") {
            items.map((movie) => {
              if (
                movie.nameRU.toLowerCase().includes(inputText.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(inputText.toLowerCase())
              ) {
                return allMoviesArray.push(movie);
              } else {
                return console.log("Ничего не найдено");
              }
            });
            setAllMovies(allMoviesArray);
            setMovies(allMoviesArray.slice(0, 12));
          } else {
            console.log("Инпут пустой");
          }
        } else {
          if (inputText !== "") {
            items.map((movie) => {
              if (
                movie.nameRU.toLowerCase().includes(inputText.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(inputText.toLowerCase())
              ) {
                return (
                  allMoviesArray.push(movie)
                );
              } else {
                return console.log("Ничего не найдено с чеком");
              }
            });
            setAllMovies(allMoviesArray);
            console.log(allMoviesArray);
            allMoviesArray.map((movie) => {
              if (movie.duration <= 40)
                return (shortMoviesArray.push(movie), console.log(shortMoviesArray), setMovies(shortMoviesArray.slice(0, 12)));
            });
          } else {
            console.log("Инпут пустой с чеком");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    let moviesArray = [];
    if (isActiveCheckbox) {
      allMovies.map((movie) => {
        if (movie.duration <= 40)
          return (
            moviesArray.push(movie), setMovies(moviesArray.slice(0, 12))
          );
      });
    } else {
      allMovies.map((movie) => {
          return (
            moviesArray.push(movie), setAllMovies(moviesArray), setMovies(moviesArray.slice(0, 12))
          );
      });
    }
    
    return () => {
      setAllMovies(allMovies);
      setMovies(movies);
    };
  }, [isActiveCheckbox]);

  function moreMovies() {
    const moreMovies = allMovies
      .filter((element) => !movies.map((e) => e.id).includes(element.id))
      .slice(0, 6);
    setMovies(movies.concat(moreMovies));
  }

  //---------------------------------------------------------------------------------------

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
              isSavedMoviesCard={isSavedMoviesCard}
              handleSavedMoviesCard={handleSavedMoviesCard}
              inputText={inputText}
              handleChangeInputText={handleChangeInputText}
              handleSubmitFoundMovies={handleSubmitFoundMovies}
              moreMovies={moreMovies}
              movies={movies}
              isLoading={isLoading}
              isHideMoreButton={isHideMoreButton}
              isActiveCheckbox={isActiveCheckbox}
              handleActiveCheckbox={handleActiveCheckbox}
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
