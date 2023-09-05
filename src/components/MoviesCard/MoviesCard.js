import { useEffect,useState } from "react";

function MoviesCard({ movie, type, handleSaveMovie, checkSavingMovie }) {
const [isSaved, setIsSaved] = useState(false); 
  
  useEffect(() => {
    if (type === "movies") 
    setIsSaved(checkSavingMovie(movie));
  }, [movie, checkSavingMovie, type])  
  

  const moviesCardButtonClassName = (`movies-card__button ${
    isSaved
      ? "movies-card__button_active"
      : ""
  } movies-card__button_type_${type}`)
  return (
    <li key={movie.movieId}>
      <article className="movies-card">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">{`${Math.floor(
            movie.duration / 60
          )}ч ${
            movie.duration > 40
              ? Math.ceil((movie.duration / 60 - 1) * 60)
              : movie.duration
          }м`}</p>
          <button
            className={moviesCardButtonClassName}
            onClick={() => handleSaveMovie(movie)}
            aria-label={`${type === "movies"? "добавить в сохраненные": "удалить из сохраненных"}`}
          ></button>
        </div>
        <img
          className="movies-card__image"
          src={movie.image}
          alt="картинка к фильму"
        ></img>
      </article>
    </li>
  );
}

export default MoviesCard;
