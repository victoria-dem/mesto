export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  closePopup() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".popup__button")
      .addEventListener("click", this.closePopup.bind(this));

    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target !== evt.currentTarget) {
        return;
      }
      this.closePopup();
    });
  }
}
