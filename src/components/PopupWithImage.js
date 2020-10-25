import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupPictureImg, popupPictureCaption) {
    super(popupSelector);
    this._popupPictureImg = popupPictureImg;
    this._popupPictureCaption = popupPictureCaption;
  }

  open(name, imgLink) {
    super.open();
    this._popupPictureImg.src = imgLink;
    this._popupPictureImg.alt = name;
    this._popupPictureCaption.textContent = name;
  }
}
