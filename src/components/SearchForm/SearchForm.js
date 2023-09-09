function SearchFrom({inputText, handleChangeInputText, handleSubmitFound }) {
  
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSubmitFound();
  }

  return (
    // если сделать вот так <form className="search-from" onChange={handleSubmit}>, то будет круто
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
