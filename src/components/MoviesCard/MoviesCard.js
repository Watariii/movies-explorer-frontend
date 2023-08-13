import moviesСardImage from "../../images/moviesСardImage.jpg";

function MoviesCard({ type, isActiveMoviesCard, handleActiveMoviesCard }) {
  return (
    <li>
      <article className="movies-card">
        <div className="movies-card__info">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч 47м</p>
          <button
            className={`movies-card__button ${
              isActiveMoviesCard ? "movies-card__button movies-card__button_active" : ""
            } movies-card__button_type_${type}`}
            onClick={handleActiveMoviesCard}
            aria-label="добавить в сохраненные"
          ></button>
        </div>
        <img
          className="movies-card__image"
          src={moviesСardImage}
          alt="картинка к фильму"
        ></img>
      </article>
    </li>
  );
}

export default MoviesCard;
