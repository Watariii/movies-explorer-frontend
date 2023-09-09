const base_url = "https://api.nomoreparties.co/beatfilm-movies";
const url = "https://api.nomoreparties.co";

function getMovies() {

  return fetch(`${base_url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkStatus());
}


function checkStatus() {
  return (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

export { base_url, url, getMovies };
