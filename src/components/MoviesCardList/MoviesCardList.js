import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
function MoviesCardList({ type, movies, handleSaveMovie, checkSavingMovie }) {

  function handleMovieClick(urlLink) {
    window.open(urlLink, '_blank');
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movies.map((movieData) => (
          <MoviesCard
            key={movieData.movieId}
            urlTrailer={movieData.trailerLink}
            movie={movieData}
            type={type}
            handleSaveMovie={handleSaveMovie}
            checkSavingMovie={checkSavingMovie}
            handleMovieClick={handleMovieClick}

          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
