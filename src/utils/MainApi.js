const apiConfig = {
    url: "https://api.watari.nomoredomains.xyz",
    headers: {
        "content-type": "application/json",
    },
};

class MainApi {
    constructor(config) {
        this._urlUsersMe = config.url + "/users/me"; //get, patch
        this._urlMovies = config.url + "/movies"; //get, post, delete
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

  addSaveMovie(newMovie) {
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
