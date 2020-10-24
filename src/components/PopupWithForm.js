import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupContainer, formSubmitHandler) {
    super(popupContainer);
    this.formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._popupContainer.querySelectorAll(".form__text");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.formSubmitHandler(this._getInputValues());
      this._popupContainer.querySelector(".form").reset();
      this.close();
    });
  }
}
