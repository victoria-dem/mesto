import { popupPictureImg } from "../utils/constants.js";
import { popupPictureCaption } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, ev) {
    super(popupSelector);
    this._ev = ev;
  }

  openPopup() {
    super.openPopup();
    popupPictureImg.src = this._ev.target.src;
    popupPictureImg.alt = this._ev.target.alt;
    popupPictureCaption.textContent = this._ev.target.alt;
  }
}
