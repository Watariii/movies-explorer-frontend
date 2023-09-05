/* eslint-disable no-useless-escape */
import { useRef } from "react";

function SignInput({
  label,
  type,
  name,
  formValue,
  handleChangeForm,
  errorsMessage,
  min,
  max
}) {
 
  const emailValidationReg = useRef();

  function useEmailValidationReg() {
    if (name === "email")
    emailValidationReg.current.pattern = "[\\dA-Za-z_.\\-]{3,}@[a-z]+[.]{1}[a-z]{2,4}"
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
      />
      <span className="sign-input__error">
        {errorsMessage}
      </span>
    </div>
  );
}

export default SignInput;
