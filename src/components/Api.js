export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponceData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка : ${res.status}`));
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._getResponceData);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._getResponceData);
  }

  getAllInfoForPage() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getAllInfoForAddedCard(name, link) {
    return Promise.all([this.getUserData(), this.postNewCard(name, link)]);
  }

  patchUserData(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponceData);
  }

  postNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponceData);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponceData);
  }

  putCardLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._getResponceData);
  }

  // getCardLike(id) {
  //   return fetch(`${this.baseUrl}/cards/likes/${id}`, {
  //     headers: this.headers,
  //   }).then(this._getResponceData);
  // }

  deleteCardLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponceData);
  }

  patchUserProfileImg(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponceData);
  }
}
