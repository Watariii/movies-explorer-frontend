import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
function Profile({ loggedIn, handleLogin, isNavBarOpen, handleOpenNavBar }) {
  const [isEdit, setIsEdit] = useState(false);
  function handleEditForm() {
    setIsEdit(!isEdit);
  }
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavBarOpen={isNavBarOpen}
        handleOpenNavBar={handleOpenNavBar}
      />
      <main className="content">
        <section className={`profile ${isNavBarOpen ? "profile_opened" : ""}`}>
          <h1 className="profile__title">Привет, Никита!</h1>
          <form className="profile__form" id="profile">
            <div className="profile__form-name">
              <p className="profile__name">Имя</p>
              <input
                className="profile__input"
                placeholder="Никита"
                disabled={!isEdit}
              />
            </div>
            <div className="profile__form-email">
              <p className="profile__email">E-mail</p>
              <input
                className="profile__input"
                placeholder="pochta@yandex.ru"
                disabled={!isEdit}
              />
            </div>
          </form>
          <p
            className={`profile__text-error ${
              isEdit ? "profile__text-error_opened" : ""
            }`}
          >
            При обновлении профиля произошла ошибка.
          </p>
          <button
            type="submit"
            onClick={handleEditForm}
            className={`profile__save ${isEdit ? "profile__save_opened" : ""}`}
            form="profile"
            aria-label="сохранить изменения"
          >
            Сохранить
          </button>
          <div
            className={`profile__buttons ${
              isEdit ? "profile__buttons_closed" : ""
            }`}
          >
            <button
              type="button"
              onClick={handleEditForm}
              className="profile__edit"
              aria-label="редактировать профиль"
            >
              Редактировать
            </button>
            <Link to="/" className="profile__logout" onClick={handleLogin}>
              Выйти из аккаунта
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
