import { Link } from "react-router-dom";
function Sign({ children, title, buttonText, text, textLink, link, type, handlelogin }) {
  return (
    <section className="sign">
      <div className="sign__top">
        <div className="header__logo"></div>
        <h1 className="sign__title">{title}</h1>
      </div>
      {children}
      <div className={`sign__bottom sign__bottom_type_${type}`}>
        <button className="sign__button" form="sign-form" type="submit" onClick={handlelogin}>{buttonText}</button>
        <h2 className="sign__text">
        {text}
          <Link to={link} className="sign__link">
            {" "}
            {textLink}
          </Link>
        </h2>
      </div>
    </section>
  );
}

export default Sign;
