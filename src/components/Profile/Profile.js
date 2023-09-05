import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
function Profile({ loggedIn, isNavBarOpen, handleOpenNavBar, handleLogout }) {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  const [isEdit, setIsEdit] = useState(false);

  const [isValidForm, setIsValidForm] = useState(true);
  const [errorsMessage, setErrorsMessage] = useState("");

  const [formValue, setFormValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const [errorMessageEditUser, setErrorMessageEditUser] = useState("");

  function handleChangeForm(evt) {
    const { name, value } = evt.target;
    if (evt.target.closest("form").checkValidity() && !(evt.target.value === currentUser.name || evt.target.value === currentUser.email)) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }

    // console.log(currentUser.name);
    // console.log(currentUser.email);
   
    setErrorsMessage(evt.target.validationMessage);
    setFormValue({ ...formValue, [name]: value });
  }

  function handleEditForm() {
    setIsValidForm(false);
    setErrorMessageEditUser("Измените имя или email");
    setIsEdit(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleEditUser(formValue);
  }

  function handleEditUser(userData) {
    mainApi
      .editUserInfo({
        name: userData.name,
        email: userData.email,
      })
      .then((data) => {
        setCurrentUser({ ...currentUser,
          name: data.name,
          email: data.email,
        });
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEdit(true);
        setErrorsMessage("Ошибка, что то пошло не так!");
      });
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
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form
            className="profile__form"
            id="profile"
            onChange={handleChangeForm}
            onSubmit={handleSubmit}
          >
            <div className="profile__form-name">
              <p className="profile__name">Имя</p>
              <input
                className="profile__input"
                value={formValue.name}
                minLength={2}
                maxLength={30}
                type="text"
                name="name"
                autoComplete="off"
                disabled={!isEdit}
                required
              />
            </div>
            <div className="profile__form-email">
              <p className="profile__email">E-mail</p>
              <input
                className="profile__input"
                value={formValue.email}
                type="text"
                name="email"
                pattern="[\dA-Za-z_.\-]{3,}@[a-z]+[.]{1}[a-z]{2,4}"
                autoComplete="off"
                disabled={!isEdit}
                required
              />
            </div>
          </form>
          <p
            className={`profile__text-error ${
              isEdit ? "profile__text-error_opened" : ""
            }`}
          >
            {errorsMessage || (isValidForm ? "" : errorMessageEditUser)}
          </p>
          <button
            type="submit"
            className={`profile__save ${isEdit ? "profile__save_opened" : ""}`}
            form="profile"
            aria-label="сохранить изменения"
            disabled={!isValidForm}
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
            <Link onClick={handleLogout} className="profile__logout">
              Выйти из аккаунта
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
