import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
function MoviesCardList({
  type,
  movies,
  handleSaveMovie,
  checkSavingMovie
}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movies.map((movieData) => (
          <MoviesCard
            key={movieData.movieId}
            movie={movieData}
            type={type}
            handleSaveMovie={handleSaveMovie}
            checkSavingMovie={checkSavingMovie}
          />
        ))}

  
      </ul>
    </section>
  );
}

// country:movieData.country,
// director:movieData.director,
// duration:movieData.duration,
// year:movieData.year,
// description:movieData.description,
// image:url+movieData.image.url,
// trailerLink:movieData.trailerLink,
// thumbnail:url+movieData.image.formats.thumbnail.url,
// movieId:movieData.id,
// nameRU:movieData.nameRU,
// nameEN:movieData.nameEN,

export default MoviesCardList;
