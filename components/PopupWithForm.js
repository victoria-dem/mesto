import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this.formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".form__text");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.formSubmitHandler(this._getInputValues());
      this.closePopup();
      this._popupSelector.querySelector(".form").reset();
      // this._popupSelector.removeEventListener("submit");
    });
  }
}

//   handlerSubmit() {
//     evt.preventDefault();
//     this.formSubmitHandler(this._getInputValues());
//     this.closePopup();
//     this._popupSelector.querySelector(".form").reset();
//     this._popupSelector.addEventListener("submit", this.handlerSubmit);
//   }
//
//   setEventListeners() {
//     super.setEventListeners();
//     this._popupSelector.addEventListener("submit", this.handlerSubmit);
//   }
// }
