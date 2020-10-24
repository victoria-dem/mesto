import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupPictureImg, popupPictureCaption) {
    super(popupSelector);
    this._popupPictureImg = popupPictureImg;
    this._popupPictureCaption = popupPictureCaption;
  }

  open(name, imgLink) {
    super.open();
    this._name = name;
    this._imgLink = imgLink;
    this._popupPictureImg.src = this._imgLink;
    this._popupPictureImg.alt = this._name;
    this._popupPictureCaption.textContent = this._name;
  }
}
