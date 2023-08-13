import Sign from "../Sign/Sign";
import SignInput from "../SignInput/SignInput";
function Login({ handleLogin }) {
  return (
    <main className="content">
      <section className="login">
        <Sign
          title="Рады видеть!"
          buttonText="Войти"
          text="Ещё не зарегистрированы?"
          textLink="Регистрация"
          link="/sign-up"
          type="login"
          handlelogin={handleLogin}
        >
          <form className="login__form" id="sign-form">
            <SignInput label="E-mail" type="email" />
            <SignInput label="Пароль" type="password" />
          </form>
        </Sign>
      </section>
    </main>
  );
}

export default Login;
