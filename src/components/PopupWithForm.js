import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this.close = this.close.bind(this);
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
      this.formSubmitHandler(this._getInputValues(), this.close);
      this._popupContainer.querySelector(".form").reset();
      // this.close();
    });
  }
}
