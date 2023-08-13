import MoviesCard from "../MoviesCard/MoviesCard";
function MoviesCardList({ type, isActiveMoviesCard, handleActiveMoviesCard }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
         <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
         <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
         <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />
        <MoviesCard
          type={type}
          isActiveMoviesCard={isActiveMoviesCard}
          handleActiveMoviesCard={handleActiveMoviesCard}
        />


      </ul>
    </section>
  );
}

export default MoviesCardList;
