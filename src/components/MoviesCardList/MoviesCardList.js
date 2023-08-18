import MoviesCard from "../MoviesCard/MoviesCard";
function MoviesCardList({ type, isSavedMoviesCard, handleSavedMoviesCard, movies }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movies.map((movieData) => ( 
          <MoviesCard
          key={movieData.id}
          movie={movieData}
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
          />
        ))}
        
        {/* <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        />
        <MoviesCard
          type={type}
          isSavedMoviesCard={isSavedMoviesCard}
          handleSavedMoviesCard={handleSavedMoviesCard}
        /> */}
      </ul>
    </section>
  );
}

export default MoviesCardList;
