function SignInput({ label, type }) {
  return (
    <div className="sign-input">
      <label className="sign-input__label" htmlFor={type}>
        {label}
      </label>
      <input
        autoComplete="off"
        className="sign-input__input"
        type={type}
        placeholder={label}
        id={type}
        minLength="2"
        maxLength="30"
        required
      />
      <span id={`${type}-error`} className="sign-input__error">
        Что то пошло не так...
      </span>
    </div>
  );
}

export default SignInput;
