const apiConfig = {
  url: "https://api.watari.nomoredomains.xyz",
  headers: {
    "content-type": "application/json",
  },
};

class MainApi {
  constructor(config) {
    this._urlUsersMe = config.url + "/users/me";
    this._urlMovies = config.url + "/movies";
    this._urlReg = config.url + "/signup";
    this._urlAuth = config.url + "/signin";
    this._urlLogOut = config.url + "/signout";
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(this._urlUsersMe, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkStatus());
  }

  editUserInfo(object) {
    return fetch(this._urlUsersMe, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: object.name,
        email: object.email,
      }),
      credentials: "include",
    }).then(this._checkStatus());
  }

  getInitialMovies() {
    return fetch(this._urlMovies, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkStatus());
  }

  saveMovie(newMovie) {
    return fetch(this._urlMovies, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newMovie),
      credentials: "include",
    }).then(this._checkStatus());
  }

  deleteSaveMovie(idMovie) {
    return fetch(`${this._urlMovies}/${idMovie}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkStatus());
  }
  //___________________________________________________________
  //auth

  register({ email, password, name }) {
    return fetch(this._urlReg, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        name: `${name}`,
      }),
      credentials: "include",
    }).then(this._checkStatus());
  }
  authorize({ email, password }) {
    return fetch(this._urlAuth, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      credentials: "include",
    }).then(this._checkStatus());
  }

  logOut() {
    return fetch(this._urlLogOut, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkStatus());
  }

  _checkStatus() {
    return (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }
}

const mainApi = new MainApi(apiConfig);

export default mainApi;
