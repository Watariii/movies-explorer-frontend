function FilterCheckbox({ isActiveCheckbox, handleActiveCheckbox }) {
  
  return (
    <div className="filter-checkbox">
      <p className="filter-checkbox__title">Короткометражки</p>
      <div className={`filter-checkbox__button ${isActiveCheckbox ? "": "filter-checkbox__button_disable" }`} onClick={handleActiveCheckbox}><button type="button" className={`filter-checkbox__icon ${isActiveCheckbox?"filter-checkbox__icon_disable": ""}`} aria-label="фильтр"></button></div>
    </div>
  );
}

export default FilterCheckbox;
