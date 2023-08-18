function SearchFrom({inputText, handleChangeInputText, handleSubmitFoundMovies }) {
  
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSubmitFoundMovies();
  }

  return (
    <form className="search-from">
      <input
        className="search-from__input"
        name="search-movies"
        type="text"
        placeholder="Фильм"
        value={inputText}
        onChange={handleChangeInputText}
      ></input>
      <button
        onClick={handleSubmit}
        type="submit"
        className="search-from__button"
        aria-label="поиск"
      >
        {" "}
      </button>
    </form>
  );
}

export default SearchFrom;
