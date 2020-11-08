import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._submitButton;
    this.close = this.close.bind(this);
  }

  getSubmitHandler(submitHandler) {
    this.submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this.submitHandler(this._submitButton, this.close);
    });
  }
}
