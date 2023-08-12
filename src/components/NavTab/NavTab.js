// import { Link } from "react-router-dom";
function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li>
          <a className="nav-tab__link" href="#aboutProject">
            О проекте
          </a>
        </li>
        <li>
          <a className="nav-tab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="nav-tab__link" href="#aboutMe">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
