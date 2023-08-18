import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import SearchFrom from "../SearchForm/SearchForm";
function Search({
  inputText,
  handleChangeInputText,
  handleSubmitFoundMovies,
  isActiveCheckbox,
  handleActiveCheckbox,
}) {
  return (
    <section className="search">
      <SearchFrom
        inputText={inputText}
        handleChangeInputText={handleChangeInputText}
        handleSubmitFoundMovies={handleSubmitFoundMovies}
      />
      <FilterCheckbox
        isActiveCheckbox={isActiveCheckbox}
        handleActiveCheckbox={handleActiveCheckbox}
      />
    </section>
  );
}

export default Search;
