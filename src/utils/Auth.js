const base_url = "http://localhost:3001";

function register({ email, password, name }) {
  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
    }),
    credentials: "include",
  }).then(checkStatus());
}
function authorize({ email, password }) {
  return fetch(`${base_url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    }),
    credentials: "include",
  }).then(checkStatus());
}

function logOut() {
  return fetch(`${base_url}/signout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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

export { register, authorize, logOut };
