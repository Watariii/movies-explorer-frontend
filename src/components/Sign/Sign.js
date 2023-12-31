import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
function Sign({ children, title, buttonText, text, textLink, link, type, isValidForm, isDisable }) {
  
  return (
    <section className="sign">
      <div className="sign__top">
        <Logo/>
        <h1 className="sign__title">{title}</h1>
      </div>
      {children}
      <div className={`sign__bottom sign__bottom_type_${type}`}>
        <button className="sign__button" form="sign-form" type="submit" disabled={!isValidForm || isDisable}>{buttonText}</button>
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
