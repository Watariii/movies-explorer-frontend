import { useState } from "react";
import Sign from "../Sign/Sign";
import SignInput from "../SignInput/SignInput";
function Login({ handleLogin, handleFormValueSign, formValue, isDisableForm }) {

  const [isValidForm, setIsValidForm] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState({});

  function handleChangeForm(evt) {
    if (evt.target.closest("form").checkValidity()) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
    const { name, value } = evt.target;
    setErrorsMessage({
      ...errorsMessage,
      [name]: evt.target.validationMessage,
    });
    handleFormValueSign({ ...formValue, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(formValue);
  }

  return (
    <main className="content">
      <section className="login">
        <Sign
          isValidForm={isValidForm}
          title="Рады видеть!"
          buttonText="Войти"
          text="Ещё не зарегистрированы?"
          textLink="Регистрация"
          link="/sign-up"
          type="login"
          isDisable={isDisableForm}
        >
          <form onSubmit={handleSubmit} className="login__form" id="sign-form">
            <SignInput
              handleChangeForm={handleChangeForm}
              formValue={formValue.email}
              errorsMessage={errorsMessage.email}
              label="E-mail"
              type="text"
              name="email"
              isDisable={isDisableForm}
            />
            <SignInput
              handleChangeForm={handleChangeForm}
              formValue={formValue.password}
              errorsMessage={errorsMessage.password}
              label="Пароль"
              type="password"
              name="password"
              min={8}
              isDisable={isDisableForm}
            />
          </form>
        </Sign>
      </section>
    </main>
  );
}

export default Login;
