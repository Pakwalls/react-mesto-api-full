import { token } from './utils.js';

class Api {
  constructor() {
    this._token = token;
    this._api = "https://mesto.nomoreparties.co/v1/cohort-43";
    this._contentType = "application/json";
    this._headers = {
      "Authorization": this._token,
      "Content-type": this._contentType,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {return Promise.reject(`Получена ошибка, код: ${res.status}, описание: ${data.message}`)});
  }

  fetchUserInfo() {
    return fetch(this._api + "/users/me", {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  patchUserInfo(name, about) {
    return fetch(this._api + "/users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(this._checkResponse)
  }

  patchAvatar(avatar) {
    return fetch(this._api + "/users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }

  fetchCardsList() {
    return fetch(this._api + "/cards", {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  postCard(name, link) {
    return fetch(this._api + "/cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(this._api + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
  
  putLike(cardId) {
    return fetch(this._api + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(this._api + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ?
    this.deleteLike(cardId):
    this.putLike(cardId)
  }
}

const api = new Api(token)
export default api