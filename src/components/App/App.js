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

import { getMovies, url } from "../../utils/MoviesApi";
import { register, authorize, logOut } from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    window.innerWidth >= 830 ? 12 : window.innerWidth >= 530 ? 8 : 5
  );
  const [amountMoreMovies, setAmountMoreMovies] = useState(
    window.innerWidth >= 830 ? 3 : window.innerWidth >= 530 ? 2 : 2
  );

  function handleResize(e) {
    if (e.target.innerWidth >= 830) {
      setAmountMovies(12);
      setAmountMoreMovies(3);
    } else if (e.target.innerWidth >= 530) {
      setAmountMovies(8);
      setAmountMoreMovies(2);
    } else {
      setAmountMovies(5);
      setAmountMoreMovies(2);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  //_________________________________________________________________________________

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
          if (!isActiveCheckboxMovie) {
            allMoviesArrayFormatted.map((movie) => {
              if (
                movie.nameRU
                  .toLowerCase()
                  .includes(inputTextMovie.toLowerCase()) ||
                movie.nameEN
                  .toLowerCase()
                  .includes(inputTextMovie.toLowerCase())
              )
                return textFilteredMoviesArray.push(movie);
            });
            if (textFilteredMoviesArray.length !== 0)
              return (
                setFilteredMoviesByText(textFilteredMoviesArray),
                setMovies(textFilteredMoviesArray.slice(0, amountMovies))
              );

            getSearchResultMessage("Ничего не найдено.");
          } else {
            allMoviesArrayFormatted.map((movie) => {
              if (
                movie.nameRU
                  .toLowerCase()
                  .includes(inputTextMovie.toLowerCase()) ||
                movie.nameEN
                  .toLowerCase()
                  .includes(inputTextMovie.toLowerCase())
              )
                return textFilteredMoviesArray.push(movie);
            });
            setFilteredMoviesByText(textFilteredMoviesArray);
            textFilteredMoviesArray.map((movie) => {
              if (movie.duration <= 40)
                return shortFilteredMoviesArray.push(movie);
            });
            if (shortFilteredMoviesArray.length !== 0)
              return (
                setFilteredMoviesByCheckbox(shortFilteredMoviesArray),
                setMovies(shortFilteredMoviesArray.slice(0, amountMovies))
              );

            getSearchResultMessage("Ничего не найдено."); // вынести в переменные
          }
        })
        .catch((err) => {
          console.log(err);
          getSearchResultMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getSearchResultMessage(
        "Поисковой запрос пустой. Введите название фильма на русском или английском."
      );
      console.log("Инпут пустой");
    }
  }

  useEffect(() => {
    setIsOpenSearchResultMessage(false);
    const filteredMoviesArray = filteredMoviesbyText;
    let moviesArray = [];
    if (inputTextMovie !== "") {
      if (isActiveCheckboxMovie) {
        filteredMoviesbyText.map((movie) => {
          if (movie.duration <= 40) return moviesArray.push(movie); //else ничего не найдено
        });
        setFilteredMoviesByCheckbox(moviesArray);
        setMovies(moviesArray.slice(0, amountMovies));
        if (moviesArray.length === 0)
          return getSearchResultMessage("Ничего не найдено.");
      } else {
        setFilteredMoviesByText(filteredMoviesbyText);
        setMovies(filteredMoviesbyText.slice(0, amountMovies));
        if (filteredMoviesArray.length === 0)
          return getSearchResultMessage("Ничего не найдено.");
      }
    } else {
      getSearchResultMessage(
        "Поисковой запрос пустой. Введите название фильма на русском или английском."
      );
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
    register({ email, password, name })
      .then(() => {
        setFormValue({ email: "", password: "", name: "" });
        handleLogin({ email, password });
      })
      .catch((err) => {
        if (err) {
          setPopUpInfoMessage({
            message: "Произошла ошибка",
            statusOk: false,
          });
          setIsPopUpInfoOpen(true);
          console.log(err);
        }
      });
  }

  //авторизация
  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then(() => {
        setFormValue({ email: "", password: "" });
        localStorage.setItem("token", true);
        checkToken();
      })
      .catch((err) => {
        if (err) {
          setPopUpInfoMessage({
            message: "Произошла ошибка",
            statusOk: false,
          });
          setIsPopUpInfoOpen(true);
          console.log(err);
        }
      });
  }

  //выйти из аккаунта
  function handleLogout() {
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
    setLoggedIn(false);
    navigate("/", { replace: true });
    logOut()
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
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setLoggedIn(true);
          navigate("/movies");
          setCurrentUser(userData);
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
    return renderSavedMovies.some((item) => {
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
          if (movie.duration <= 40)
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
        if (movie.duration <= 40)
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
                renderSavedMovies={renderSavedMovies}
                handleSaveMovie={handleSaveMovie}
                inputTextSavedMovie={inputTextSavedMovie}
                handleChangeInputTextSavedMovie={
                  handleChangeInputTextSavedMovie
                }
                handleSubmitFoundSavedMovies={handleSubmitFoundSavedMovies}
                isActiveCheckboxSavedMovie={isActiveCheckboxSavedMovie}
                handleActiveCheckboxSavedMovie={handleActiveCheckboxSavedMovie}
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
