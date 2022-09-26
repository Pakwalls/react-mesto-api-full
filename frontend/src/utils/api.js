class Api {
  constructor() {
    this._api = 'http://localhost:3000';
    this._headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-type": "application/json",
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

  updateToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

const api = new Api()
export default api