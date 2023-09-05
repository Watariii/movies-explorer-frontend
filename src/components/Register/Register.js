import { useState } from "react";
import Sign from "../Sign/Sign";
import SignInput from "../SignInput/SignInput";
function Register({ handleRegister, handleFormValueSign, formValue }) {
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
    handleRegister(formValue);
  }

  return (
    <main className="content">
      <section className="register">
        <Sign
          isValidForm={isValidForm}
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          text="Уже зарегистрированы?"
          textLink="Войти"
          link="/sign-in"
          type="register"
        >
          <form
            onSubmit={handleSubmit}
            className="register__form"
            id="sign-form"
          >
            <SignInput
              handleChangeForm={handleChangeForm}
              formValue={formValue.name}
              errorsMessage={errorsMessage.name}
              label="Имя"
              type="text"
              name="name"
              min={2}
              max={30}
            />
            <SignInput
              handleChangeForm={handleChangeForm}
              formValue={formValue.email}
              errorsMessage={errorsMessage.email}
              label="E-mail"
              type="text"
              name="email"
            />
            <SignInput
              handleChangeForm={handleChangeForm}
              formValue={formValue.password}
              errorsMessage={errorsMessage.password}
              label="Пароль"
              type="password"
              name="password"
              min={8}
            />
          </form>
        </Sign>
      </section>
    </main>
  );
}

export default Register;
