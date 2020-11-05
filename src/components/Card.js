export default class Card {
  constructor(
    data,
    templateSelector,
    elementSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._imgLink = data.link;
    this._text = data.name;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerName = data.owner.name;
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._elementSelector)
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", (ev) => {
        this._handleCardClick(this._text, this._imgLink);
      });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton() {
    this._button = this._element.querySelector(".button_type_like");
    if (this._likes.length > 0) {
      if (!this._button.classList.contains("button_pressed_like")) {
        this._button.classList.add("button_pressed_like");
      }
    } else {
      if (this._button.classList.contains("button_pressed_like")) {
        this._button.classList.remove("button_pressed_like");
      }
    }
  }

  _handleLikeButton() {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_pressed_like");
  }

  _generateCardContent(profileName) {
    this._element = this._getTemplate();
    this._element.querySelector(".card__item-title").textContent = this._text;
    this._element.querySelector(
      ".card__item-numbers"
    ).textContent = this._likes.length;
    const cardImg = this._element.querySelector(".card__image");
    cardImg.src = this._imgLink;
    cardImg.alt = this._text;
    if (profileName === this._ownerName) {
      this._element
        .querySelector(".button_type_delete")
        .classList.add("button_visible");
    }
    this._toggleLikeButton();
    return this._element;
  }

  getCardElement(profileName) {
    const cardElement1 = this._generateCardContent(profileName);
    this._setEventListeners();
    return cardElement1;
    console.log(this._id);
  }
}
