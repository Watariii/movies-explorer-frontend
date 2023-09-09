import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import SearchFrom from "../SearchForm/SearchForm";
function Search({
  inputText,
  handleChangeInputText,
  handleSubmitFound,
  isActiveCheckbox,
  handleActiveCheckbox,
}) {
  return (
    <section className="search">
      <SearchFrom
        inputText={inputText}
        handleChangeInputText={handleChangeInputText}
        handleSubmitFound={handleSubmitFound}
      />
      <FilterCheckbox
        isActiveCheckbox={isActiveCheckbox}
        handleActiveCheckbox={handleActiveCheckbox}
      />
    </section>
  );
}

export default Search;
