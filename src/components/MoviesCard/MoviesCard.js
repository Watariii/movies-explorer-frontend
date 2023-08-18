import { url } from "../../utils/MoviesApi";

function MoviesCard({ movie, type, isSavedMoviesCard, handleSavedMoviesCard }) {
  return (
    <li key={movie.id}>
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
            className={`movies-card__button ${
              isSavedMoviesCard
                ? "movies-card__button movies-card__button_active"
                : ""
            } movies-card__button_type_${type}`}
            onClick={handleSavedMoviesCard}
            aria-label="добавить в сохраненные"
          ></button>
        </div>
        <img
          className="movies-card__image"
          src={`${url}${movie.image.url}`}
          alt="картинка к фильму"
        ></img>
      </article>
    </li>
  );
}

export default MoviesCard;
