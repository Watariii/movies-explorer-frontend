/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Layout from "../Layout/Layout";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {
  MAX_DURATION_SHORT_FILM,
  SHOW_MOVIES_PC,
  SHOW_MOVIES_TABLET,
  SHOW_MOVIES_MOBILE,
  ADD_SHOW_MOVIES_TABLET,
  ADD_SHOW_MOVIES_MOBILE,
  ADD_SHOW_MOVIES_PC,
  SCREENWIDTH_FROM_830,
  SCREENWIDTH_FROM_530,
  SEARCH_MESSAGE_NOT_FOUND,
  SEARCH_MESSAGE_EMPTY_INPUT,
  SEARCH_MESSAGE_ERROR_REQUEST,
  POPUP_MESSAGE_ERROR,
} from "../../utils/constants";

import { getMovies, url } from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  // для сообщения открытие/закрытие
  const [isOpenSearchResultMessage, setIsOpenSearchResultMessage] =
    useState(false);
  //___________________________________________________________________________
  const navigate = useNavigate();

  function handleOpenNavBar() {
    setIsNavBarOpen(!isNavBarOpen);
  }
  //movies
  //---------------------------------------------------------------------------------------
  //______________________________________
  const [amountMovies, setAmountMovies] = useState(
    window.innerWidth >= SCREENWIDTH_FROM_830
      ? SHOW_MOVIES_PC
      : window.innerWidth >= SCREENWIDTH_FROM_530
      ? SHOW_MOVIES_TABLET
      : SHOW_MOVIES_MOBILE
  );
  const [amountMoreMovies, setAmountMoreMovies] = useState(
    window.innerWidth >= SCREENWIDTH_FROM_830
      ? ADD_SHOW_MOVIES_PC
      : window.innerWidth >= SCREENWIDTH_FROM_530
      ? ADD_SHOW_MOVIES_TABLET
      : ADD_SHOW_MOVIES_MOBILE
  );

  function handleResize(e) {
    if (e.target.innerWidth >= SCREENWIDTH_FROM_830) {
      setAmountMovies(SHOW_MOVIES_PC);
      setAmountMoreMovies(ADD_SHOW_MOVIES_PC);
    } else if (e.target.innerWidth >= SCREENWIDTH_FROM_530) {
      setAmountMovies(SHOW_MOVIES_TABLET);
      setAmountMoreMovies(ADD_SHOW_MOVIES_TABLET);
    } else {
      setAmountMovies(SHOW_MOVIES_MOBILE);
      setAmountMoreMovies(ADD_SHOW_MOVIES_MOBILE);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  //_________________________________________________________________________________
  const [allMoviesFormatted, setAllMoviesFormatted] = useState(
    JSON.parse(localStorage.getItem("allMoviesFormatted")) || []
  );

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [filteredMoviesbyText, setFilteredMoviesByText] = useState(
    JSON.parse(localStorage.getItem("filteredMoviesbyText")) || []
  );
  const [filteredMoviesbyCheckbox, setFilteredMoviesByCheckbox] = useState(
    JSON.parse(localStorage.getItem("filteredMoviesbyCheckbox")) || []
  );
  const [inputTextMovie, setInputTextMovie] = useState(
    JSON.parse(localStorage.getItem("inputTextMovie")) || ""
  );
  const [isActiveCheckboxMovie, setIsActiveCheckboxMovie] = useState(
    JSON.parse(localStorage.getItem("isActiveCheckboxMovie")) || false
  );
  const [isHideMoreButton, setIsHideMoreButton] = useState(false);

  // для сообщения передача сообщения
  const [onSearchResultMessage, setOnSearchResultMessage] = useState("");

  function getSearchResultMessage(message) {
    setOnSearchResultMessage(message);
    setIsOpenSearchResultMessage(true);
  }

  //___________________________________________

  function handleActiveCheckboxMovie() {
    setIsActiveCheckboxMovie(!isActiveCheckboxMovie);
  }

  function handleChangeInputTextMovie(evt) {
    setInputTextMovie(evt.target.value);
  }

  useEffect(() => {
    if (!isActiveCheckboxMovie) {
      if (movies.length === filteredMoviesbyText.length) {
        setIsHideMoreButton(true);
      } else {
        setIsHideMoreButton(false);
      }
    } else if (movies.length === filteredMoviesbyCheckbox.length) {
      setIsHideMoreButton(true);
    } else {
      setIsHideMoreButton(false);
    }
  }, [
    filteredMoviesbyText.length,
    filteredMoviesbyCheckbox.length,
    movies.length,
    isActiveCheckboxMovie,
  ]);

  function handleSubmitFoundMovies() {
    setFilteredMoviesByText([]);
    setFilteredMoviesByCheckbox([]);
    setMovies([]);
    setIsOpenSearchResultMessage(false);
    if (inputTextMovie !== "") {
      setIsOpenSearchResultMessage(false);
      setIsLoading(true);
      JSON.parse(localStorage.getItem("allMoviesFormatted")).length !== 0
        ? setTimeout(() => {
            LocalFoundMovies();
          }, 1000)
        : RequestFoundMovies();
    } else {
      getSearchResultMessage(SEARCH_MESSAGE_EMPTY_INPUT);
    }
  }

  function RequestFoundMovies() {
    getMovies()
      .then((allMoviesArray) => {
        let allMoviesArrayFormatted = []; // все отформатированные фильмы
        let textFilteredMoviesArray = []; // все отформатированные фильмы отфильтрованные по названию
        let shortFilteredMoviesArray = []; // все отформатированные фильмы с фильтрацией по тексту отфильтрованные по короткометражкам
        allMoviesArray.map((movie) =>
          allMoviesArrayFormatted.push({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: url + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: url + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
          })
        );
        setAllMoviesFormatted(allMoviesArrayFormatted);
        if (!isActiveCheckboxMovie) {
          allMoviesArrayFormatted.map((movie) => {
            if (
              movie.nameRU
                .toLowerCase()
                .includes(inputTextMovie.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(inputTextMovie.toLowerCase())
            )
              return textFilteredMoviesArray.push(movie);
          });
          if (textFilteredMoviesArray.length !== 0)
            return (
              setFilteredMoviesByText(textFilteredMoviesArray),
              setMovies(textFilteredMoviesArray.slice(0, amountMovies))
            );

          getSearchResultMessage(SEARCH_MESSAGE_NOT_FOUND);
        } else {
          allMoviesArrayFormatted.map((movie) => {
            if (
              movie.nameRU
                .toLowerCase()
                .includes(inputTextMovie.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(inputTextMovie.toLowerCase())
            )
              return textFilteredMoviesArray.push(movie);
          });
          setFilteredMoviesByText(textFilteredMoviesArray);
          textFilteredMoviesArray.map((movie) => {
            if (movie.duration <= MAX_DURATION_SHORT_FILM)
              return shortFilteredMoviesArray.push(movie);
          });
          if (shortFilteredMoviesArray.length !== 0)
            return (
              setFilteredMoviesByCheckbox(shortFilteredMoviesArray),
              setMovies(shortFilteredMoviesArray.slice(0, amountMovies))
            );

          getSearchResultMessage(SEARCH_MESSAGE_NOT_FOUND);
        }
      })
      .catch((err) => {
        console.log(err);
        getSearchResultMessage(SEARCH_MESSAGE_ERROR_REQUEST);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function LocalFoundMovies() {
    setIsLoading(false);
    let allMoviesArrayFormatted = allMoviesFormatted;
    let textFilteredMoviesArray = [];
    let shortFilteredMoviesArray = [];

    if (!isActiveCheckboxMovie) {
      allMoviesArrayFormatted.map((movie) => {
        if (
          movie.nameRU.toLowerCase().includes(inputTextMovie.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(inputTextMovie.toLowerCase())
        )
          return textFilteredMoviesArray.push(movie);
      });
      if (textFilteredMoviesArray.length !== 0)
        return (
          setFilteredMoviesByText(textFilteredMoviesArray),
          setMovies(textFilteredMoviesArray.slice(0, amountMovies))
        );

      getSearchResultMessage(SEARCH_MESSAGE_NOT_FOUND);
    } else {
      allMoviesArrayFormatted.map((movie) => {
        if (
          movie.nameRU.toLowerCase().includes(inputTextMovie.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(inputTextMovie.toLowerCase())
        )
          return textFilteredMoviesArray.push(movie);
      });
      setFilteredMoviesByText(textFilteredMoviesArray);
      textFilteredMoviesArray.map((movie) => {
        if (movie.duration <= MAX_DURATION_SHORT_FILM)
          return shortFilteredMoviesArray.push(movie);
      });
      if (shortFilteredMoviesArray.length !== 0)
        return (
          setFilteredMoviesByCheckbox(shortFilteredMoviesArray),
          setMovies(shortFilteredMoviesArray.slice(0, amountMovies))
        );

      getSearchResultMessage(SEARCH_MESSAGE_NOT_FOUND);
    }
  }

  useEffect(() => {
    setIsOpenSearchResultMessage(false);
    const filteredMoviesArray = filteredMoviesbyText;
    let moviesArray = [];
    if (inputTextMovie !== "") {
      if (isActiveCheckboxMovie) {
        filteredMoviesbyText.map((movie) => {
          if (movie.duration <= MAX_DURATION_SHORT_FILM)
            return moviesArray.push(movie);
        });
        setFilteredMoviesByCheckbox(moviesArray);
        setMovies(moviesArray.slice(0, amountMovies));
        if (moviesArray.length === 0)
          return getSearchResultMessage(SEARCH_MESSAGE_NOT_FOUND);
      } else {
        setFilteredMoviesByText(filteredMoviesbyText);
        setMovies(filteredMoviesbyText.slice(0, amountMovies));
        if (filteredMoviesArray.length === 0)
          return getSearchResultMessage(SEARCH_MESSAGE_NOT_FOUND);
      }
    } else {
      getSearchResultMessage(SEARCH_MESSAGE_EMPTY_INPUT);
    }
  }, [isActiveCheckboxMovie]);

  function moreMovies() {
    if (!isActiveCheckboxMovie) {
      const moreMovies = filteredMoviesbyText
        .filter(
          (element) => !movies.map((e) => e.movieId).includes(element.movieId)
        )
        .slice(0, amountMoreMovies);
      setMovies(movies.concat(moreMovies));
    } else {
      const moreMovies = filteredMoviesbyCheckbox
        .filter(
          (element) => !movies.map((e) => e.movieId).includes(element.movieId)
        )
        .slice(0, amountMoreMovies);
      setMovies(movies.concat(moreMovies));
    }
  }

  // Для localstorage
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem(
        "allMoviesFormatted",
        JSON.stringify(allMoviesFormatted)
      );
      localStorage.setItem("movies", JSON.stringify(movies));
      localStorage.setItem(
        "filteredMoviesbyText",
        JSON.stringify(filteredMoviesbyText)
      );
      localStorage.setItem(
        "filteredMoviesbyCheckbox",
        JSON.stringify(filteredMoviesbyCheckbox)
      );
      localStorage.setItem("inputTextMovie", JSON.stringify(inputTextMovie));
      localStorage.setItem(
        "isActiveCheckboxMovie",
        JSON.stringify(isActiveCheckboxMovie)
      );
    }
  }, [
    allMoviesFormatted,
    movies,
    filteredMoviesbyText,
    filteredMoviesbyCheckbox,
    inputTextMovie,
    isActiveCheckboxMovie,
  ]);

  //___________________________________________________________________________________
  //форма регистрации и авторизации
  //---------------------------------------------------------------------------------------
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  function handleFormValueSign(dataValue) {
    setFormValue(dataValue);
  }
  //_______________________________________________________________________________
  //регистрация
  function handleRegister({ email, password, name }) {
    mainApi
      .register({ email, password, name })
      .then(() => {
        setFormValue({ email: "", password: "", name: "" });
        handleLogin({ email, password });
      })
      .catch((err) => {
        if (err) {
          setPopUpInfoMessage({
            message: POPUP_MESSAGE_ERROR,
            statusOk: false,
          });
          setIsPopUpInfoOpen(true);
          console.log(err);
        }
      });
  }

  //авторизация
  function handleLogin({ email, password }) {
    mainApi
      .authorize({ email, password })
      .then(() => {
        setFormValue({ email: "", password: "" });
        localStorage.setItem("token", true);
        checkToken();
      })
      .catch((err) => {
        if (err) {
          setPopUpInfoMessage({
            message: POPUP_MESSAGE_ERROR,
            statusOk: false,
          });
          setIsPopUpInfoOpen(true);
          console.log(err);
        }
      });
  }

  //выйти из аккаунта
  function handleLogout() {
    setAllMoviesFormatted([]);
    setMovies([]);
    setFilteredMoviesByText([]);
    setFilteredMoviesByCheckbox([]);
    setInputTextMovie("");
    setSavedMovies([]);
    setRenderSavedMovies([]);
    setIsActiveCheckboxMovie(false);
    setCurrentUser({});
    localStorage.clear();
    setOnSearchResultMessage("");
    setIsOpenSearchResultMessage(false);
    setFilteredSavedMoviesbyText([]);
    setFilteredSavedMoviesbyCheckbox([]);
    setPopUpInfoMessage("");
    setLoggedIn(false);
    navigate("/", { replace: true });
    mainApi
      .logOut()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //____________________________________________________________________________________
  //пользователь
  const [currentUser, setCurrentUser] = useState({});

  function checkToken() {
    const path = location.pathname;
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData);
          if (path === "/sign-in" || path === "/sign-up") {
            navigate("/movies", { replace: true });
          } else {
            navigate(path, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  //_____________________________________________________________________________________
  //saved-movies
  const [savedMovies, setSavedMovies] = useState([]); //хранение загруженных фильмов
  const [renderSavedMovies, setRenderSavedMovies] = useState([]); // отрисовка фильмов на странице

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getInitialMovies()
        .then((movies) => {
          setRenderSavedMovies(movies.reverse());
          setFilteredSavedMoviesbyText(movies);
          setSavedMovies(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  //__________________________________________________________
  //добавляет movies в сохраненные
  function saveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
        setRenderSavedMovies([savedMovie, ...renderSavedMovies]);
        setFilteredSavedMoviesbyText([
          savedMovie,
          ...filteredSavedMoviesbyText,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //удаление сохраненного фильма
  function deleteSavedMovie(idMovie) {
    mainApi
      .deleteSaveMovie(idMovie)
      .then((deletedMovie) => {
        setSavedMovies(
          savedMovies.filter((item) => item._id !== deletedMovie._id)
        );
        setRenderSavedMovies(
          renderSavedMovies.filter((item) => item._id !== deletedMovie._id)
        );
        setFilteredSavedMoviesbyText(
          filteredSavedMoviesbyText.filter(
            (item) => item._id !== deletedMovie._id
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //проверка добавлен ли фильм в сохраненные

  function checkSavingMovie(movie) {
    return savedMovies.some((item) => {
      return item.movieId === movie.movieId;
    });
  }
  //переключение фильма из сохраненных в несохраненные и наоборот
  function handleSaveMovie(movie) {
    let id;
    renderSavedMovies.map((item) => {
      if (item.movieId === movie.movieId) return (id = item._id);
    });
    if (!id) {
      saveMovie(movie);
    } else {
      deleteSavedMovie(id);
    }
  }
  //__________________________________________________________
  // поиск сохраненных фильмов

  const [inputTextSavedMovie, setInputTextSavedMovie] = useState("");
  const [isActiveCheckboxSavedMovie, setIsActiveCheckboxSavedMovie] =
    useState(false);
  const [filteredSavedMoviesbyText, setFilteredSavedMoviesbyText] = useState(
    []
  );
  const [, setFilteredSavedMoviesbyCheckbox] = useState([]);

  function handleChangeInputTextSavedMovie(evt) {
    setInputTextSavedMovie(evt.target.value);
  }

  function handleSubmitFoundSavedMovies() {
    setFilteredSavedMoviesbyText([]);
    setFilteredSavedMoviesbyCheckbox([]);
    let allSavedMoviesArray = savedMovies.length
      ? savedMovies
      : renderSavedMovies;
    let textFilteredSavedMoviesArray = [];
    let shortFilteredSavedMoviesArray = [];
    if (inputTextSavedMovie !== "") {
      if (!isActiveCheckboxSavedMovie) {
        allSavedMoviesArray.map((movie) => {
          if (
            movie.nameRU
              .toLowerCase()
              .includes(inputTextSavedMovie.toLowerCase()) ||
            movie.nameEN
              .toLowerCase()
              .includes(inputTextSavedMovie.toLowerCase())
          )
            return textFilteredSavedMoviesArray.push(movie);
        });
        setFilteredSavedMoviesbyText(textFilteredSavedMoviesArray);
        setRenderSavedMovies(textFilteredSavedMoviesArray);
        setSavedMovies(allSavedMoviesArray);
      } else {
        allSavedMoviesArray.map((movie) => {
          if (
            movie.nameRU
              .toLowerCase()
              .includes(inputTextSavedMovie.toLowerCase()) ||
            movie.nameEN
              .toLowerCase()
              .includes(inputTextSavedMovie.toLowerCase())
          )
            return textFilteredSavedMoviesArray.push(movie);
        });
        setFilteredSavedMoviesbyText(textFilteredSavedMoviesArray);
        textFilteredSavedMoviesArray.map((movie) => {
          if (movie.duration <= MAX_DURATION_SHORT_FILM)
            return shortFilteredSavedMoviesArray.push(movie);
        });
        setFilteredSavedMoviesbyCheckbox(shortFilteredSavedMoviesArray);
        setRenderSavedMovies(shortFilteredSavedMoviesArray);
        setSavedMovies(allSavedMoviesArray);
      }
    } else {
      setFilteredSavedMoviesbyText(allSavedMoviesArray);
      setRenderSavedMovies(allSavedMoviesArray);
    }
  }

  useEffect(() => {
    let textFilteredSavedMoviesArray = filteredSavedMoviesbyText;
    let shortFilteredSavedMoviesArray = [];
    if (isActiveCheckboxSavedMovie) {
      filteredSavedMoviesbyText.map((movie) => {
        if (movie.duration <= MAX_DURATION_SHORT_FILM)
          return shortFilteredSavedMoviesArray.push(movie); //else ничего не найдено
      });
      setFilteredSavedMoviesbyCheckbox(shortFilteredSavedMoviesArray);
      setRenderSavedMovies(shortFilteredSavedMoviesArray);
    } else {
      setRenderSavedMovies(textFilteredSavedMoviesArray);
    }
  }, [isActiveCheckboxSavedMovie]);

  function handleActiveCheckboxSavedMovie() {
    setIsActiveCheckboxSavedMovie(!isActiveCheckboxSavedMovie);
  }

  //________________________________________________________________
  // попап инфо при регистрации и авторизации

  const [isPopUpInfoOpen, setIsPopUpInfoOpen] = useState(false);
  const [popUpInfoMessage, setPopUpInfoMessage] = useState({
    message: "",
    statusOk: false,
  });

  function handlePopUpClosed() {
    setIsPopUpInfoOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <Layout>
        <Routes>
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
          <Route path="*" element={<NotFound />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                Component={Movies}
                loggedIn={loggedIn}
                isNavBarOpen={isNavBarOpen}
                handleOpenNavBar={handleOpenNavBar}
                inputTextMovie={inputTextMovie}
                handleChangeInputTextMovie={handleChangeInputTextMovie}
                handleSubmitFoundMovies={handleSubmitFoundMovies}
                moreMovies={moreMovies}
                movies={movies}
                isLoading={isLoading}
                isHideMoreButton={isHideMoreButton}
                isActiveCheckboxMovie={isActiveCheckboxMovie}
                handleActiveCheckboxMovie={handleActiveCheckboxMovie}
                onMessageResult={onSearchResultMessage}
                isMessageResultOpen={isOpenSearchResultMessage}
                handleSaveMovie={handleSaveMovie}
                checkSavingMovie={checkSavingMovie}
                onSearchResultMessage={onSearchResultMessage}
                isOpenSearchResultMessage={isOpenSearchResultMessage}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                Component={SavedMovies}
                loggedIn={loggedIn}
                isNavBarOpen={isNavBarOpen}
                handleOpenNavBar={handleOpenNavBar}
                savedMovies={savedMovies}
                renderSavedMovies={renderSavedMovies}
                setRenderSavedMovies={setRenderSavedMovies}
                handleSaveMovie={handleSaveMovie}
                inputTextSavedMovie={inputTextSavedMovie}
                handleChangeInputTextSavedMovie={
                  handleChangeInputTextSavedMovie
                }
                handleSubmitFoundSavedMovies={handleSubmitFoundSavedMovies}
                isActiveCheckboxSavedMovie={isActiveCheckboxSavedMovie}
                handleActiveCheckboxSavedMovie={handleActiveCheckboxSavedMovie}
                setInputTextSavedMovie={setInputTextSavedMovie}
                setIsActiveCheckboxSavedMovie={setIsActiveCheckboxSavedMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                Component={Profile}
                loggedIn={loggedIn}
                isNavBarOpen={isNavBarOpen}
                handleOpenNavBar={handleOpenNavBar}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                handleFormValueSign={handleFormValueSign}
                formValue={formValue}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={handleRegister}
                handleFormValueSign={handleFormValueSign}
                formValue={formValue}
              />
            }
          />
        </Routes>
        <InfoTooltip
          isPopUpInfoOpen={isPopUpInfoOpen}
          handlePopUpClosed={handlePopUpClosed}
          popUpInfoMessage={popUpInfoMessage}
        />
      </Layout>
    </CurrentUserContext.Provider>
  );
}

export default App;
