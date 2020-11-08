// import { jobProfile, nameProfile, pictureProfile } from "../utils/constants";

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // getInitialCards() {
  //
  // }

  // _getData(url) {
  //   return fetch(url, {
  //     headers: this.headers,
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getOneCard(id) {
  //   return fetch(`${this.baseUrl}/cards/${id}`, {
  //     headers: this.headers,
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  getAllInfoForPage() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getAllInfoForAddedCard(name, link) {
    return Promise.all([this.getUserData(), this.postNewCard(name, link)]);
  }

  // getAllInfoAboutLike(id) {
  //   return Promise.all([this.getUserData(), this.getCardLikes(id)]);
  // }
  //
  // getCardLikes(id) {
  //   return fetch(`${this.baseUrl}/cards/${id}`, {
  //     headers: this.headers,
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  patchUserData(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  putCardLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCardLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCardLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  patchUserProfileImg(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
