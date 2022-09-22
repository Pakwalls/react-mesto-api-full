const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
  .then((data) => {return Promise.reject(`Получена ошибка, код: ${res.status}, описание: ${data.message}`)});
}

const headers = {
  "Content-Type": "application/json"
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify(
      {
        password,
        email,
      })
  })
  .then(res => checkResponse(res))
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify(
      {
      email,
      password
      })
  })
  .then(res => checkResponse(res))  
};

export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => checkResponse(res));
};