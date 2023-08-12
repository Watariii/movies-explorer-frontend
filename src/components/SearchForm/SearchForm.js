function SearchFrom() {
  return (
    <form className="search-from">
      <input
        className="search-from__input"
        name="search-movies"
        type="text"
        placeholder="Фильм"
      >
      </input>
        <button className="search-from__button" aria-label="поиск"> </button>
    </form>
  );
}

export default SearchFrom;
