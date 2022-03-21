class Api {
  constructor({baseUrl, token}) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`Ошибка ${result.status}`);
  }

  // метод для загрузки информации о пользователе с сервера
  getUserData() {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: {
      authorization: `${this.token}`,
    }
  })
    .then(this._checkResponse)

  }

  // метод для загрузки начальных карточек с сервера
  getInitialCards() {
  return fetch(`${this.baseUrl}/cards`, {
    headers: {
      authorization: `${this.token}`,
    }
  })
    .then(this._checkResponse)

  }

  // метод для редактирования профиля
  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(this._checkResponse)

  }

  // метод для добавления новой карточки
  createNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    })
  })
    .then(this._checkResponse)

  }

  // метод для удаления карточки
  deleteCard(itemId) {
    return fetch(`${this.baseUrl}/cards/${itemId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: itemId,
    })
  })
    .then(this._checkResponse)

  }

  // метод для постановки лайка
  putLike(itemId) {
    return fetch(`${this.baseUrl}/cards/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: itemId,
    })
  })
    .then(this._checkResponse)

  }

  // метод для удаления лайка
  deleteLike(itemId) {
    return fetch(`${this.baseUrl}/cards/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: itemId,
    })
  })
    .then(this._checkResponse)

  }

   // метод для обновления аватара пользователя
   updatedAvatar(avatarData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarData.avatar
    })
  })
    .then(this._checkResponse)

  }


}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: '00d03ff0-290d-430c-82a1-6d959f58942a',
});

export default api

