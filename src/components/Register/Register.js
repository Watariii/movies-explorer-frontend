import Sign from "../Sign/Sign";
import SignInput from "../SignInput/SignInput";
function Register({ handleLogin }) {
  return (
    <section className="register">
      <Sign
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        textLink="Войти"
        link="/sign-in"
        type="register"
        handlelogin={handleLogin}
      >
        <form className="register__form" id="sign-form">
          <SignInput label="Имя" type="text" />
          <SignInput label="E-mail" type="email" />
          <SignInput label="Пароль" type="password" />
        </form>
      </Sign>
    </section>
  );
}

export default Register;
