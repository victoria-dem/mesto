export default class Card {
  constructor(data, templateSelector, elementSelector, handleCardClick) {
    this._imgLink = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._elementSelector)
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector('.button_type_like')
      .addEventListener('click', () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector('.button_type_delete')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector('.card__image')
      .addEventListener('click', (ev) => {
        this._handleCardClick(this._text, this._imgLink);
      });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButton() {
    this._element
      .querySelector('.button_type_like')
      .classList.toggle('button_pressed_like');
  }

  _generateCardContent() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__item-title').textContent = this._text;
    const cardImg = this._element.querySelector('.card__image');
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
