import { useState } from "react";
function FilterCheckbox() {
  const [isActive, setIsActive] = useState(false);
  function handleActive() {
    setIsActive(!isActive);
  }
  return (
    <div className="filter-checkbox">
      <p className="filter-checkbox__title">Короткометражки</p>
      <div className={`filter-checkbox__button ${isActive ? "filter-checkbox__button_active": "" }`} onClick={handleActive}><button type="button" className={`filter-checkbox__icon ${isActive?"filter-checkbox__icon_active": ""}`} aria-label="фильтр"></button></div>
    </div>
  );
}

export default FilterCheckbox;
