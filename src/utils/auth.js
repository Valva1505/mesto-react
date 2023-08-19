export const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const request = (url, method, data, token = null) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestOptions = {
    method,
    headers,
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  return fetch(url, requestOptions).then(checkResponse);
};

export const register = ({ email, password }) => {
  return request(`${BASE_URL}/signup`, "POST", { email, password });
};

export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, "POST", { email, password });
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, "GET", null, token);
};