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
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this.deleteCardFromScreen = this.deleteCardFromScreen.bind(this);
    this.countLikes = this.countLikes.bind(this);
    this.buttonLikeColor = this.buttonLikeColor.bind(this);
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._elementSelector)
      .cloneNode(true);
  }

  deleteCardFromScreen() {
    this._element.remove();
    this._element = null;
  }

  buttonLikeColor(isColor) {
    isColor
      ? this._buttonLike.classList.add("button_pressed_like")
      : this._buttonLike.classList.remove("button_pressed_like");
  }

  countLikes(likes) {
    this._likeNumbers = this._element.querySelector(".card__item-numbers");
    this._likeNumbers.textContent = likes.length;
  }

  _generateCardContent(profileId) {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".button_type_like");
    this._cardName = this._element.querySelector(".card__item-title");
    this._cardName.textContent = this._text;
    this._likeNumbers = this._element.querySelector(".card__item-numbers");
    const cardImg = this._element.querySelector(".card__image");
    cardImg.src = this._imgLink;
    cardImg.alt = this._text;
    if (profileId === this._ownerId) {
      this._element
        .querySelector(".button_type_delete")
        .classList.add("button_visible");
    }
    this.countLikes(this._likes);
    if (this._likes.some((item) => item._id === profileId)) {
      this.buttonLikeColor(true);
    }
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", () => {
        this._handleLikeClick(
          this._element,
          this._likes,
          this._id,
          this._buttonLike,
          this.countLikes,
          this.buttonLikeColor
        );
      });
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id, this.deleteCardFromScreen);
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", (ev) => {
        this._handleCardClick(this._text, this._imgLink);
      });
  }

  getCardElement(profileId) {
    this._profileId = profileId;
    const cardElement = this._generateCardContent(profileId);
    this._setEventListeners();
    return cardElement;
  }
}
