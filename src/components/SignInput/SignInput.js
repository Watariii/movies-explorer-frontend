/* eslint-disable no-useless-escape */
import { useRef } from "react";
import { REGEX_EMAIL_PATTERN } from "../../utils/constants";

function SignInput({
  label,
  type,
  name,
  formValue,
  handleChangeForm,
  errorsMessage,
  min,
  max,
  isDisable
}) {
 
  const emailValidationReg = useRef();

  function useEmailValidationReg() {
    if (name === "email")
    emailValidationReg.current.pattern = REGEX_EMAIL_PATTERN
  }
  return (
    <div className="sign-input">
      <label className="sign-input__label" htmlFor={type}>
        {label}
      </label>
      <input
        onChange={handleChangeForm}
        value={formValue}
        name={name}
        autoComplete="off"
        className="sign-input__input"
        type={type}
        placeholder={label}
        minLength={min}
        maxLength={max}
        ref={emailValidationReg}
        onClick={useEmailValidationReg}
        required
        disabled={isDisable}
      />
      <span className="sign-input__error">
        {errorsMessage}
      </span>
    </div>
  );
}

export default SignInput;
