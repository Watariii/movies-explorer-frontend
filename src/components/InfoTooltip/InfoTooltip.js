import { useState } from "react";
import success from "../../images/success.svg";
// import failure from "../../images/failure.svg";
function InfoTooltip() {

  const [isOpen, setIsOpen] = useState(false);

  function handleOpen(status) {
    setIsOpen(!isOpen);
  }

  return (
    <section className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button
          className="pop-up__close-icon"
          type="button"
          aria-label="закрыть"
          onClick={handleOpen}
        ></button>
        <img
          className="pop-up__status-icon"
          src={success}
          alt="иконка статуса"
        />
        <h3 className="pop-up__title">
          Сообщение об ошибке или успешной регистрации
        </h3>
      </div>
    </section>
  );
}
export default InfoTooltip;
