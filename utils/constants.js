export const popupPictureImg = document.querySelector(".popup__picture");
export const popupPictureCaption = document.querySelector(
  ".popup__picture-caption"
);
export const popupEdit = document.querySelector(".popup_type_edit");
export const nameInput = popupEdit.querySelector(".form__text_profile_title");
export const jobInput = popupEdit.querySelector(".form__text_profile_subtitle");
export const formEdit = popupEdit.querySelector(".form");
export const profile = document.querySelector(".profile");
export const nameProfile = profile.querySelector(".profile__title");
export const jobProfile = profile.querySelector(".profile__subtitle");
export const editButton = profile.querySelector(".button_type_edit");
export const addButton = profile.querySelector(".button_type_add");
export const popupAdd = document.querySelector(".popup_type_add");
export const formAdd = popupAdd.querySelector(".form");
export const cardListSection = document.querySelector(".stack__list");
export const formValidationClasses = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__error_visible",
};
