import { Link } from "react-router-dom";
function Footer() {
    return ( <footer className="footer">
        <h3 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <p className="footer__copyright">© 2023</p>
        <nav className="footer__links">
            <Link to="https://practicum.yandex.ru/" className="footer__link" target="_blank">Яндекс.Практикум</Link>
            <Link to="https://github.com/" className="footer__link" target="_blank">Github</Link>
        </nav>
    </footer>)
};

export default Footer;