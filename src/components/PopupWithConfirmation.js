import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  getSubmitHandler(submitHandler) {
    this.submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer
      .querySelector(".button_type_input")
      .addEventListener("click", () => {
        this.submitHandler();
        this.close();
      });
  }
}
