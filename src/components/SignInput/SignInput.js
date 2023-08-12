function SignInput({ label, type }) {

  return (
    <>
      <label
        className="sign-input__label"
        htmlFor={type}
      >
        {label}
      </label>
      <input
        autoComplete="off"
        className="sign-input"
        type={type}
        placeholder={label}
        id={type}
        minLength="2"
        maxLength="30"
        required
      />
      <span id={type} className="sign-input-error">Что то пошло не так...</span>
    </>
  );
}

export default SignInput;
