import success from "../../images/success.svg";
import failure from "../../images/failure.svg";
function InfoTooltip({isPopUpInfoOpen, handlePopUpClosed, popUpInfoMessage}) {

  return (
    <section className={`pop-up ${isPopUpInfoOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button
          className="pop-up__close-icon"
          type="button"
          aria-label="закрыть"
          onClick={() => handlePopUpClosed()}
        ></button>
        <img
          className="pop-up__status-icon"
          src={popUpInfoMessage.statusOk? success: failure}
          alt="иконка статуса"
        />
        <h3 className="pop-up__title">
          {popUpInfoMessage.message}
        </h3>
      </div>
    </section>
  );
}
export default InfoTooltip;
