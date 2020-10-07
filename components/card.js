export class Card {
  constructor(data, templateSelector, elementSelector) {
    this._imgLink = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
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
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._openPopupPicture();
      });
  }

  _openPopupPicture() {
    const popupPictureContainer = document.querySelector(".popup_type_picture");
    const popupPicture = popupPictureContainer.querySelector(".popup__picture");
    popupPictureContainer.classList.toggle("popup_opened");
    popupPicture.src = this._imgLink;
    popupPicture.alt = this._text;
    popupPictureContainer.querySelector(
      ".popup__picture-caption"
    ).textContent = this._text;
    popupPictureContainer.addEventListener("click", this._closeOnOverlay);
    document.addEventListener("keydown", this._closeOnEsc);
  }

  _closeOnOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    const picElem = document.querySelector(".popup_type_picture");
    picElem.classList.toggle("popup_opened");
    picElem.removeEventListener("click", this._closeOnOverlay);
  }

  _closeOnEsc(evt) {
    if (evt.key === "Escape") {
      document
        .querySelector(".popup_type_picture")
        .classList.toggle("popup_opened");
      document.removeEventListener("keydown", this._closeOnEsc);
    }
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeButton() {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_pressed_like");
  }

  _generateCardContent() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__item-title").textContent = this._text;
    const cardImg = this._element.querySelector(".card__image");
    cardImg.src = this._imgLink;
    cardImg.alt = this._text;
    return this._element;
  }

  getCardElement() {
    const cardElement1 = this._generateCardContent();
    this._setEventListeners();
    return cardElement1;
  }
}
