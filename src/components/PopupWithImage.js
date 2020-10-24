import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(popupPictureImg, popupPictureCaption, name, imgLink) {
    super.open();
    this._name = name;
    this._imgLink = imgLink;
    popupPictureImg.src = this._imgLink;
    popupPictureImg.alt = this._name;
    popupPictureCaption.textContent = this._name;
  }
}
