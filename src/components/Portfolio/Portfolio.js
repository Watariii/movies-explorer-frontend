import { Link } from "react-router-dom";
function Portfolio() {
  return <div className="portfolio">
    <h2 className="portfolio__title">Портфолио</h2>
    <ul className="portfolio__list">
        <li className="portfolio__link"><Link className="portfolio__text-link" to="https://github.com/Watariii/how-to-learn.git" target="_blank">Статичный сайт <div className="portfolio__icon-link"></div></Link></li>
        <li className="portfolio__link"><Link className="portfolio__text-link" to="https://github.com/Watariii/russian-travel.git" target="_blank">Адаптивный сайт <div className="portfolio__icon-link"></div></Link></li>
        <li className="portfolio__link"><Link className="portfolio__text-link" to="https://github.com/Watariii/react-mesto-auth/settings/pages" target="_blank">Одностраничное приложение <div className="portfolio__icon-link"></div></Link></li>
    </ul>
  </div>;
}

export default Portfolio;
