import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  getSubmitHandler(handler) {
    this.submitHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitHandler();
      this.close();
    });
  }
}
